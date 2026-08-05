import fs from "fs";
import path from "path";

export interface GalleryMediaItem {
  id: string;
  filename: string;
  imageUrl: string;
  title: string;
  category: "weddings" | "corporate" | "tattoos" | "postcards" | "private";
  categoryLabel: string;
  description: string;
  alt: string;
  aspectRatio: "portrait" | "landscape" | "square";
}

const METADATA_MAPPING: Record<
  string,
  {
    title: string;
    category: GalleryMediaItem["category"];
    categoryLabel: string;
    description: string;
    alt: string;
  }
> = {
  "Tezza_2025_07_07_152559638_1.webp": {
    title: "Детайл от бутиковата машина Пощичка",
    category: "postcards",
    categoryLabel: "Машина & Детайли",
    description: "Брандирани отделения с авторски картички, готови за вземане от гостите.",
    alt: "Брандирани отделения с картички Пощичка за събития",
  },
  "Tezza_2025_07_07_170901960_1.webp": {
    title: "Мобилният кът на Пощичка сред природата",
    category: "weddings",
    categoryLabel: "Сватби & Кът",
    description: "Елегантна декоративна визия и табло с марки за градински сватби и празненства.",
    alt: "Мобилен кът на Пощичка за градинска сватба на открито",
  },
  "Tezza_2025_07_13_155324686.webp": {
    title: "Колекция от марки и монети-жетони",
    category: "postcards",
    categoryLabel: "Картички & Жетони",
    description: "Плетена кошничка с монети, информационно табло и авторски картички „България в марки“.",
    alt: "Сватбено табло Пощичка с картички и монети-жетони за гостите",
  },
  "Tezza_2025_07_13_155326413.webp": {
    title: "Пликове за персонализирани спомени",
    category: "weddings",
    categoryLabel: "Сватби & Детайли",
    description: "Персонализирани хартиени пликове Пощичка, съхраняващи уникалните картички от събитието.",
    alt: "Хартиени пликове с лого Пощичка, държани от гости на събитие",
  },
  "Tezza_2025_07_13_155331795.webp": {
    title: "Пускане на жетон в машината",
    category: "private",
    categoryLabel: "Интеракция",
    description: "Гост пуска специална монета-жетон в слота за получаване на своята картичка.",
    alt: "Гост пуска жетон в бутиковата вендинг машина Пощичка",
  },
  "Tezza_2025_07_13_155333570.webp": {
    title: "Получаване на авторски картички Пощичка",
    category: "weddings",
    categoryLabel: "Сватби & Моменти",
    description: "Усмихнат гост държи комплект от изработени картички пред ретро машината.",
    alt: "Ръка на гост с готови картички пред машината Пощичка",
  },
};

export function getGalleryItems(): GalleryMediaItem[] {
  try {
    const galleryDir = path.join(process.cwd(), "public/media/gallery");
    if (!fs.existsSync(galleryDir)) {
      return [];
    }

    const files = fs.readdirSync(galleryDir);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"];

    const validFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    return validFiles.map((filename, idx) => {
      const meta = METADATA_MAPPING[filename] || {
        title: `Спомен от събитие #${idx + 1}`,
        category: "weddings",
        categoryLabel: "Сватби & Събития",
        description: "Персонализиран подарък и уникален спомен от събитие с Пощичка.",
        alt: `Автентична снимка от събитие с Пощичка - ${filename}`,
      };

      return {
        id: `gallery-img-${idx + 1}`,
        filename,
        imageUrl: `/media/gallery/${filename}`,
        title: meta.title,
        category: meta.category,
        categoryLabel: meta.categoryLabel,
        description: meta.description,
        alt: meta.alt,
        aspectRatio: "portrait",
      };
    });
  } catch (error) {
    console.error("Error reading gallery items:", error);
    return [];
  }
}
