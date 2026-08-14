import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {}
  }
}

/**
 * Safely reads JSON data from persistent file storage with fallback
 */
export function readPersistentData<T>(fileName: string, fallback: T): T {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (content && content.trim()) {
        const parsed = JSON.parse(content);
        return parsed as T;
      }
    }
  } catch (err) {
    console.warn(`[Storage] Notice reading ${fileName}:`, err);
  }
  return fallback;
}

/**
 * Safely writes JSON data to persistent file storage
 */
export function writePersistentData<T>(fileName: string, data: T): boolean {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`[Storage] Error writing ${fileName}:`, err);
    return false;
  }
}
