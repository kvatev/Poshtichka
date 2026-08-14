import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: "weddings" | "corporate" | "tattoos" | "postcards" | "private";
  categoryLabel: string;
  description: string;
  eventDate?: string;
  createdAt: string;
}

declare global {
  var __GALLERY_STORE__: GalleryItem[] | undefined;
}

const defaultGalleryList: GalleryItem[] = [
  {
    id: "gal-1",
    imageUrl: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
    title: "Детайл от бутиковата машина Пощичка",
    category: "postcards",
    categoryLabel: "Картички & Жетони",
    description: "Брандирани отделения с авторски картички, готови за вземане от гостите.",
    eventDate: "2025-07-07",
    createdAt: "2025-07-07",
  },
  {
    id: "gal-2",
    imageUrl: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
    title: "Сватбено тържество сред природата - Бургас",
    category: "weddings",
    categoryLabel: "Сватби & Кът",
    description: "Елегантна декоративна визия и табло с марки за градински сватби и празненства.",
    eventDate: "2025-07-07",
    createdAt: "2025-07-07",
  },
  {
    id: "gal-3",
    imageUrl: "/media/gallery/Tezza_2025_07_13_155324686.webp",
    title: "Колекция от марки и монети-жетони",
    category: "postcards",
    categoryLabel: "Картички & Жетони",
    description: "Плетена кошничка с монети, информационно табло и авторски картички „България в марки“.",
    eventDate: "2025-07-13",
    createdAt: "2025-07-13",
  },
  {
    id: "gal-4",
    imageUrl: "/media/gallery/Tezza_2025_07_13_155326413.webp",
    title: "Пликове за персонализирани спомени",
    category: "weddings",
    categoryLabel: "Сватби & Детайли",
    description: "Персонализирани хартиени пликове Пощичка, съхраняващи уникалните картички от събитието.",
    eventDate: "2025-07-13",
    createdAt: "2025-07-13",
  },
  {
    id: "gal-5",
    imageUrl: "/media/gallery/Tezza_2025_07_13_155331795.webp",
    title: "Пускане на жетон в машината",
    category: "private",
    categoryLabel: "Интеракция",
    description: "Гост пуска специална монета-жетон в слота за получаване на своята картичка.",
    eventDate: "2025-07-13",
    createdAt: "2025-07-13",
  },
  {
    id: "gal-6",
    imageUrl: "/media/gallery/Tezza_2025_07_13_155333570.webp",
    title: "Получаване на авторски картички Пощичка",
    category: "weddings",
    categoryLabel: "Сватби & Моменти",
    description: "Усмихнат гост държи комплект от изработени картички пред ретро машината.",
    eventDate: "2025-07-13",
    createdAt: "2025-07-13",
  },
];

if (!globalThis.__GALLERY_STORE__) {
  globalThis.__GALLERY_STORE__ = defaultGalleryList;
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: dbItems, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && dbItems && dbItems.length > 0) {
      const formatted: GalleryItem[] = dbItems.map((item: any) => ({
        id: item.id?.toString() || `gal-${Date.now()}`,
        imageUrl: item.image_url || item.imageUrl || "/media/Main Page/Main Banner.webp",
        title: item.title || "Спомен от събитие",
        category: item.category || "weddings",
        categoryLabel: item.category_label || item.categoryLabel || "Сватби",
        description: item.description || "",
        eventDate: item.event_date || item.eventDate,
        createdAt: item.created_at ? item.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
      }));
      globalThis.__GALLERY_STORE__ = formatted;
      return NextResponse.json(formatted);
    }
  } catch (err) {
    console.warn("Fetch gallery DB note:", err);
  }

  return NextResponse.json(globalThis.__GALLERY_STORE__ || defaultGalleryList);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, categoryLabel, imageUrl, description, eventDate } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Моля, въведете заглавие и изберете снимка." },
        { status: 400 }
      );
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title,
      category: category || "weddings",
      categoryLabel: categoryLabel || "Сватби & Събития",
      imageUrl,
      description: description || "",
      eventDate: eventDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (!globalThis.__GALLERY_STORE__) {
      globalThis.__GALLERY_STORE__ = defaultGalleryList;
    }
    globalThis.__GALLERY_STORE__.unshift(newItem);

    // Persist to Supabase DB if table exists
    try {
      const supabase = await createClient();
      await supabase.from("gallery").insert([
        {
          title: newItem.title,
          category: newItem.category,
          category_label: newItem.categoryLabel,
          image_url: newItem.imageUrl,
          description: newItem.description,
          event_date: newItem.eventDate,
        },
      ]);
    } catch (dbErr) {
      console.warn("Supabase insert gallery item notice:", dbErr);
    }

    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: "Грешка при добавяне на събитие в галерията." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, category, categoryLabel, imageUrl, description, eventDate } = body;

    if (!id) {
      return NextResponse.json({ error: "Липсва ID на елемента." }, { status: 400 });
    }

    if (globalThis.__GALLERY_STORE__) {
      globalThis.__GALLERY_STORE__ = globalThis.__GALLERY_STORE__.map((item) =>
        item.id === id
          ? {
              ...item,
              title: title ?? item.title,
              category: category ?? item.category,
              categoryLabel: categoryLabel ?? item.categoryLabel,
              imageUrl: imageUrl ?? item.imageUrl,
              description: description ?? item.description,
              eventDate: eventDate ?? item.eventDate,
            }
          : item
      );
    }

    try {
      const supabase = await createClient();
      await supabase
        .from("gallery")
        .update({
          title,
          category,
          category_label: categoryLabel,
          image_url: imageUrl,
          description,
          event_date: eventDate,
        })
        .eq("id", id);
    } catch (dbErr) {
      console.warn("Supabase update gallery notice:", dbErr);
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json({ error: "Грешка при дублиране/редакция." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Липсва ID." }, { status: 400 });
    }

    if (globalThis.__GALLERY_STORE__) {
      globalThis.__GALLERY_STORE__ = globalThis.__GALLERY_STORE__.filter((item) => item.id !== id);
    }

    try {
      const supabase = await createClient();
      await supabase.from("gallery").delete().eq("id", id);
    } catch (dbErr) {
      console.warn("Supabase delete gallery notice:", dbErr);
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json({ error: "Грешка при изтриване." }, { status: 500 });
  }
}
