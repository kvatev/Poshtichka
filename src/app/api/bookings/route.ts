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
  price?: number;
  depositPaid?: number;
  createdAt: string;
}

declare global {
  var __BOOKINGS_STORE__: BookingRecord[] | undefined;
}

const mockBookingsList: BookingRecord[] = [
  {
    id: "BK-2027-06-17",
    fullName: "Резервация 17.06.2027",
    phone: "+359 888 000 000",
    email: "info@poshtichka.bg",
    eventDate: "2027-06-17",
    eventType: "Сватбено тържество",
    venueLocation: "София, Локация на събитието",
    guestCount: 100,
    preferredContact: "телефон",
    message: "Потвърдена резервация за 17 юни 2027 г.",
    status: "confirmed",
    price: 500,
    depositPaid: 150,
    createdAt: "2026-08-15",
  },
  {
    id: "BK-2027-06-26",
    fullName: "Резервация 26.06.2027",
    phone: "+359 888 000 000",
    email: "info@poshtichka.bg",
    eventDate: "2027-06-26",
    eventType: "Сватбено тържество",
    venueLocation: "Варна, Локация на събитието",
    guestCount: 100,
    preferredContact: "телефон",
    message: "Потвърдена резервация за 26 юни 2027 г.",
    status: "confirmed",
    price: 500,
    depositPaid: 150,
    createdAt: "2026-08-15",
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
