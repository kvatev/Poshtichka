import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "public/media/uploads");
const galleryDir = path.join(process.cwd(), "public/media/gallery");

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function GET() {
  try {
    ensureDirectoryExists(uploadsDir);
    ensureDirectoryExists(galleryDir);

    const uploadFiles = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
    const galleryFiles = fs.existsSync(galleryDir) ? fs.readdirSync(galleryDir) : [];

    const items: { id: string; url: string; filename: string; category: string }[] = [];

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

    uploadFiles.forEach((file, idx) => {
      if (/\.(webp|jpg|jpeg|png|gif|svg)$/i.test(file)) {
        items.push({
          id: `up-${idx}-${file}`,
          url: `/media/uploads/${file}`,
          filename: file,
          category: "uploads",
        });
      }
    });

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Media list error:", err);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  try {
    ensureDirectoryExists(uploadsDir);
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Няма качен файл." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
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
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Грешка при качване на файла." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Невалиден URL на файл." }, { status: 400 });
    }

    const relativePath = url.replace(/^\//, "");
    const fullPath = path.join(process.cwd(), "public", relativePath);

    if (fs.existsSync(fullPath) && fullPath.includes("public/media/")) {
      fs.unlinkSync(fullPath);
    }

    return NextResponse.json({ success: true, message: "Файлът беше изтрит." });
  } catch (err) {
    console.error("Delete media error:", err);
    return NextResponse.json({ error: "Грешка при изтриване." }, { status: 500 });
  }
}
