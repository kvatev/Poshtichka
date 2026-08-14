import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // Cache for 60 seconds

// Exact booked dates provided by user
const defaultBookedDates = [
  // Август 2026
  "2026-08-23",
  "2026-08-30",

  // Септември 2026
  "2026-09-07",
  "2026-09-12",
  "2026-09-16",

  // Октомври 2026
  "2026-10-03",
  "2026-10-10",
  "2026-10-28",
  "2026-10-29",
  "2026-10-30",
  "2026-10-31",

  // Ноември 2026
  "2026-11-01",
  "2026-11-02",
  "2026-11-03",

  // Декември 2026
  "2026-12-10",
  "2026-12-11",
  "2026-12-12",
  "2026-12-13",
  "2026-12-14",
  "2026-12-15",
  "2026-12-24", // Коледа
  "2026-12-25", // Коледа
  "2026-12-26", // Коледа
  "2026-12-31", // Нова година

  // Януари 2027
  "2027-01-01", // Нова година
];

export async function GET() {
  const headers = {
    "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
  };

  try {
    const supabase = await createClient();
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("event_date, status")
      .eq("status", "confirmed");

    if (error || !bookings || bookings.length === 0) {
      return NextResponse.json({ bookedDates: defaultBookedDates }, { headers });
    }

    const dbDates = bookings.map((b) => b.event_date);
    return NextResponse.json(
      { bookedDates: Array.from(new Set([...defaultBookedDates, ...dbDates])) },
      { headers }
    );
  } catch {
    return NextResponse.json({ bookedDates: defaultBookedDates }, { headers });
  }
}
