import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const uploadsDir = path.join(process.cwd(), "public/media/uploads");
const galleryDir = path.join(process.cwd(), "public/media/gallery");

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nsrmhreocsjtrzjexrbu.supabase.co";
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_secret_PmzYOWh5aE1vISNSroJ_IA_dOqT_RBr";

const isServerless =
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.VERCEL_ENV) ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  process.env.NODE_ENV === "production";

function getSupabaseAdmin() {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

function ensureDirectoryExists(dir: string) {
  if (isServerless) return;
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {}
}

export async function GET() {
  try {
    const items: { id: string; url: string; filename: string; category: string }[] = [];

    // 1. Fetch remote files from Supabase Storage bucket "media"
    try {
      const supabase = getSupabaseAdmin();
      const { data: cloudFiles } = await supabase.storage.from("media").list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (cloudFiles && Array.isArray(cloudFiles)) {
        cloudFiles.forEach((file) => {
          if (file.name && file.name !== ".emptyFolderPlaceholder" && file.name !== "test.txt") {
            const { data: urlData } = supabase.storage
              .from("media")
              .getPublicUrl(file.name);

            items.push({
              id: `cloud-${file.name}`,
              url: urlData.publicUrl,
              filename: file.name,
              category: "uploads",
            });
          }
        });
      }
    } catch (cloudErr) {
      console.warn("[MediaAPI] Supabase Storage list notice:", cloudErr);
    }

    // 2. Read local bundled gallery files
    try {
      const galleryFiles = fs.existsSync(galleryDir) ? fs.readdirSync(galleryDir) : [];
      galleryFiles.forEach((file, idx) => {
        if (/\.(webp|jpg|jpeg|png|gif|svg)$/i.test(file)) {
          items.push({
            id: `gal-${idx}-${file}`,
            url: `/media/gallery/${file}`,
            filename: file,
            category: "gallery",
          });
        }
      });
    } catch {}

    // 3. Read local uploads files (if present)
    try {
      const uploadFiles = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
      uploadFiles.forEach((file, idx) => {
        if (/\.(webp|jpg|jpeg|png|gif|svg)$/i.test(file)) {
          // Avoid duplicates if already in list
          if (!items.some((it) => it.filename === file)) {
            items.push({
              id: `up-${idx}-${file}`,
              url: `/media/uploads/${file}`,
              filename: file,
              category: "uploads",
            });
          }
        }
      });
    } catch {}

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Media list error:", err);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Няма качен файл." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const contentType = file.type || "image/webp";

    // 1. Upload to Supabase Storage bucket "media" (Production-ready)
    try {
      const supabase = getSupabaseAdmin();
      const { error: uploadErr } = await supabase.storage
        .from("media")
        .upload(sanitizedFilename, buffer, {
          contentType,
          upsert: true,
        });

      if (!uploadErr) {
        const { data: publicUrlData } = supabase.storage
          .from("media")
          .getPublicUrl(sanitizedFilename);

        // Optionally write to local disk if in local dev
        if (!isServerless) {
          try {
            ensureDirectoryExists(uploadsDir);
            const filePath = path.join(uploadsDir, sanitizedFilename);
            fs.writeFileSync(filePath, buffer);
          } catch {}
        }

        return NextResponse.json({
          success: true,
          file: {
            id: `cloud-${sanitizedFilename}`,
            url: publicUrlData.publicUrl,
            filename: sanitizedFilename,
            category: "uploads",
          },
        });
      }
      console.warn("[MediaAPI] Supabase upload failed, attempting local fallback:", uploadErr);
    } catch (supabaseErr) {
      console.warn("[MediaAPI] Supabase storage exception:", supabaseErr);
    }

    // 2. Local fallback for development
    if (!isServerless) {
      ensureDirectoryExists(uploadsDir);
      const filePath = path.join(uploadsDir, sanitizedFilename);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        file: {
          id: `up-${sanitizedFilename}`,
          url: `/media/uploads/${sanitizedFilename}`,
          filename: sanitizedFilename,
          category: "uploads",
        },
      });
    }

    return NextResponse.json(
      { error: "Грешка при качване на файла в хранилището." },
      { status: 500 }
    );
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err?.message || "Грешка при качване на файла." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Невалиден URL на файл." }, { status: 400 });
    }

    // 1. Delete from Supabase Storage if it's a Supabase URL
    if (url.includes("/storage/v1/object/public/media/")) {
      const fileName = url.split("/storage/v1/object/public/media/").pop();
      if (fileName) {
        const supabase = getSupabaseAdmin();
        await supabase.storage.from("media").remove([fileName]);
      }
    }

    // 2. Delete from local disk if in dev
    if (!isServerless) {
      try {
        const relativePath = url.replace(/^\//, "");
        const fullPath = path.join(process.cwd(), "public", relativePath);
        if (fs.existsSync(fullPath) && fullPath.includes("public/media/")) {
          fs.unlinkSync(fullPath);
        }
      } catch {}
    }

    return NextResponse.json({ success: true, message: "Файлът беше изтрит." });
  } catch (err: any) {
    console.error("Delete media error:", err);
    return NextResponse.json(
      { error: err?.message || "Грешка при изтриване на файла." },
      { status: 500 }
    );
  }
}
