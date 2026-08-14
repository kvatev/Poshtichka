import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { readPersistentData, writePersistentData } from "@/lib/server-storage";

export interface BookingRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  venueLocation: string;
  guestCount: number;
  preferredContact: string;
  message: string;
  status: string;
  createdAt: string;
}

declare global {
  var __BOOKINGS_STORE__: BookingRecord[] | undefined;
}

const mockBookingsList: BookingRecord[] = [
  {
    id: "BK-1001",
    fullName: "Светлана & Димитър Василеви",
    phone: "+359 888 123 456",
    email: "svetlana@example.com",
    eventDate: "2026-08-14",
    eventType: "Сватбено тържество",
    venueLocation: "Созопол, Ресторант Вятърна Мелница",
    guestCount: 120,
    preferredContact: "телефон",
    message: "Искаме акварелен дизайн с цветя и златни акценти.",
    status: "confirmed",
    createdAt: "2026-08-01",
  },
  {
    id: "BK-1002",
    fullName: "Мартин Тодоров (DevTech Ltd)",
    phone: "+359 889 987 654",
    email: "martin@devtech.bg",
    eventDate: "2026-08-22",
    eventType: "Корпоративно събитие",
    venueLocation: "Бургас, Гранд Хотел Приморец",
    guestCount: 200,
    preferredContact: "имейл",
    message: "Нуждаем се от лого на фирмата върху всички картички.",
    status: "pending",
    createdAt: "2026-08-03",
  },
  {
    id: "BK-1003",
    fullName: "Елена Стоянова",
    phone: "+359 887 555 444",
    email: "elena@example.com",
    eventDate: "2026-08-28",
    eventType: "Юбилей 50г",
    venueLocation: "Поморие, Wave Resort",
    guestCount: 80,
    preferredContact: "viber",
    message: "Желаем и временни татуировки с надпис 50 & Fabulous.",
    status: "confirmed",
    createdAt: "2026-08-04",
  },
];

function getStoredBookings(): BookingRecord[] {
  if (globalThis.__BOOKINGS_STORE__ && globalThis.__BOOKINGS_STORE__.length > 0) {
    return globalThis.__BOOKINGS_STORE__;
  }
  const fromFile = readPersistentData<BookingRecord[]>("bookings", mockBookingsList);
  globalThis.__BOOKINGS_STORE__ = fromFile;
  return fromFile;
}

function saveStoredBookings(bookings: BookingRecord[]): void {
  globalThis.__BOOKINGS_STORE__ = bookings;
  writePersistentData("bookings", bookings);
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && !url.includes("example"));
}

export async function GET() {
  const current = getStoredBookings();

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: dbBookings, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && dbBookings && dbBookings.length > 0) {
        const formatted: BookingRecord[] = dbBookings.map((b: any) => ({
          id: b.id || `BK-${b.id}`,
          fullName: b.full_name || b.fullName,
          phone: b.phone,
          email: b.email,
          eventDate: b.event_date || b.eventDate,
          eventType: b.event_type || b.eventType,
          venueLocation: b.venue_location || b.venueLocation,
          guestCount: b.guest_count || b.guestCount,
          preferredContact: b.preferred_contact || b.preferredContact,
          message: b.message || "",
          status: b.status || "pending",
          createdAt: b.created_at ? b.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
        }));
        saveStoredBookings(formatted);
        return NextResponse.json(formatted);
      }
    } catch (err) {
      console.warn("Fetch bookings warning:", err);
    }
  }

  return NextResponse.json(current);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      phone,
      email,
      eventDate,
      eventType,
      venueLocation,
      guestCount,
      preferredContact,
      message,
    } = body;

    if (!fullName || !phone || !email || !eventDate || !venueLocation) {
      return NextResponse.json(
        { error: "Моля, попълнете всички задължителни полета." },
        { status: 400 }
      );
    }

    const newRecord: BookingRecord = {
      id: `BK-${Date.now()}`,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      eventDate,
      eventType: eventType || "Сватбено тържество",
      venueLocation: String(venueLocation).trim(),
      guestCount: Number(guestCount) || 100,
      preferredContact: preferredContact || "телефон",
      message: message || "",
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        const { data: existing } = await supabase
          .from("bookings")
          .select("id, status")
          .eq("event_date", eventDate)
          .eq("status", "confirmed");

        if (existing && existing.length > 0) {
          return NextResponse.json(
            {
              error: `За съжаление, датата ${eventDate} вече е потвърдена за друго събитие. Моля, изберете друга дата.`,
            },
            { status: 409 }
          );
        }

        await supabase.from("bookings").insert([
          {
            full_name: fullName,
            phone,
            email,
            event_date: eventDate,
            event_type: eventType,
            venue_location: venueLocation,
            guest_count: guestCount,
            preferred_contact: preferredContact,
            message: message || null,
            status: "pending",
          },
        ]);
      } catch (dbErr) {
        console.warn("Supabase booking insert notice:", dbErr);
      }
    }

    const current = getStoredBookings();
    const updated = [newRecord, ...current];
    saveStoredBookings(updated);

    return NextResponse.json({
      success: true,
      message: "Вашата резервация беше получена успешно!",
    });
  } catch (err) {
    console.error("Booking submission error:", err);
    return NextResponse.json(
      { error: "Грешка при обработка на заявката." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        await supabase.from("bookings").update({ status }).eq("id", id);
      } catch (err) {
        console.warn("Supabase update booking status notice:", err);
      }
    }

    const current = getStoredBookings();
    const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
    saveStoredBookings(updated);

    return NextResponse.json({ success: true, id, status });
  } catch (err) {
    return NextResponse.json({ error: "Error updating booking status" }, { status: 500 });
  }
}
