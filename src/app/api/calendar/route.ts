import { NextResponse } from "next/server";
import { readCloudOrFileData } from "@/lib/server-storage";
import { BookingRecord } from "@/app/api/bookings/route";

export const revalidate = 0; // Fresh calendar data

const defaultBookedDates = [
  "2026-08-23",
  "2026-08-30",
  "2026-09-07",
  "2026-09-12",
  "2026-10-03",
  "2026-10-10",
  "2027-06-17",
  "2027-06-26",
];

export async function GET() {
  const headers = {
    "Cache-Control": "no-store, max-age=0",
  };

  try {
    const bookings = await readCloudOrFileData<BookingRecord[]>("bookings", []);
    const confirmedDates = (bookings || [])
      .filter((b) => b.status === "confirmed" || b.status === "deposit_paid")
      .map((b) => b.eventDate)
      .filter(Boolean);

    const allDates = Array.from(new Set([...defaultBookedDates, ...confirmedDates]));
    return NextResponse.json({ bookedDates: allDates }, { headers });
  } catch {
    return NextResponse.json({ bookedDates: defaultBookedDates }, { headers });
  }
}
