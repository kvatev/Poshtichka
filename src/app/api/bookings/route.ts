import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    try {
      const supabase = await createClient();

      // Validate double booking for confirmed date
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

      // Insert new booking
      const { error } = await supabase.from("bookings").insert([
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

      if (error) {
        console.warn("Supabase insert note:", error.message);
      }
    } catch (dbErr) {
      console.warn("Supabase connection note:", dbErr);
    }

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
