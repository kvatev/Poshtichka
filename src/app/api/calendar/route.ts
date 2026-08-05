import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // Cache for 60 seconds

const mockBookedDates = [
  "2026-08-14",
  "2026-08-22",
  "2026-08-28",
  "2026-09-05",
  "2026-09-12",
  "2026-09-19",
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
      return NextResponse.json(
        { bookedDates: mockBookedDates },
        { headers }
      );
    }

    const dates = bookings.map((b) => b.event_date);
    return NextResponse.json(
      { bookedDates: Array.from(new Set([...mockBookedDates, ...dates])) },
      { headers }
    );
  } catch {
    return NextResponse.json(
      { bookedDates: mockBookedDates },
      { headers }
    );
  }
}
