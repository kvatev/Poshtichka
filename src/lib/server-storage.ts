import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

const SUPABASE_REST_URL = "https://nsrmhreocsjtrzjexrbu.supabase.co/rest/v1/popup_config";
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_secret_PmzYOWh5aE1vISNSroJ_IA_dOqT_RBr";

const isServerless =
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.VERCEL_ENV) ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  process.env.NODE_ENV === "production";

const KEY_ID_MAP: Record<string, number> = {
  "map-events": 10,
  services: 20,
  testimonials: 30,
  faq: 40,
  "general-settings": 50,
  "homepage-config": 60,
  "website-content": 70,
  cities: 80,
  "event-types": 90,
  bookings: 100,
  pricing: 110,
  products: 120,
  media: 130,
  banners: 140,
  seo: 150,
};

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 1000 + (Math.abs(hash) % 8999);
}

function ensureDataDir() {
  if (isServerless) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Fail-safe silently on read-only environments
  }
}

/**
 * Safely reads JSON data from persistent file storage with fallback
 */
export function readPersistentData<T>(fileName: string, fallback: T): T {
  try {
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (content && content.trim()) {
        const parsed = JSON.parse(content);
        return parsed as T;
      }
    }
  } catch (err) {
    console.warn(`[Storage] Read fallback notice for ${fileName}`);
  }
  return fallback;
}

/**
 * Safely writes JSON data to persistent file storage (local dev only)
 */
export function writePersistentData<T>(fileName: string, data: T): boolean {
  if (isServerless) {
    // Vercel serverless functions have a read-only filesystem; never attempt to write
    return true;
  }

  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn(`[Storage] Skipping local disk write for ${fileName} on read-only system`);
    return false;
  }
}

/**
 * Reads data with cloud Supabase priority and local file fallback
 */
export async function readCloudOrFileData<T>(fileName: string, fallback: T): Promise<T> {
  const recordId = KEY_ID_MAP[fileName] || hashCode(fileName);

  try {
    const res = await fetch(`${SUPABASE_REST_URL}?id=eq.${recordId}&select=description`, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0 && rows[0].description) {
        const parsed = JSON.parse(rows[0].description);
        if (parsed !== null && parsed !== undefined) {
          // Never write to disk during read on serverless runtime
          return parsed as T;
        }
      }
    }
  } catch (err) {
    console.warn(`[CloudStorage] Read from Supabase notice for ${fileName}`);
  }

  // Fallback to local persistent data without dangerously overwriting cloud
  return readPersistentData(fileName, fallback);
}

/**
 * Writes data directly to Supabase cloud and local file for permanent persistence
 */
export async function writeCloudAndFileData<T>(fileName: string, data: T): Promise<boolean> {
  // Only attempt local disk write if not on serverless / Vercel
  if (!isServerless) {
    writePersistentData(fileName, data);
  }

  const recordId = KEY_ID_MAP[fileName] || hashCode(fileName);
  try {
    const jsonStr = JSON.stringify(data);
    const res = await fetch(SUPABASE_REST_URL, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        id: recordId,
        title: fileName,
        badge: "system",
        description: jsonStr,
        is_active: true,
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(`[CloudStorage] Failed writing ${fileName} to Supabase (${res.status}):`, errText);
    }
    return res.ok;
  } catch (err) {
    console.error(`[CloudStorage] Error upserting ${fileName} to Supabase:`, err);
    return false;
  }
}
