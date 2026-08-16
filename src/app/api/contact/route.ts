import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, service, message } = body;

    // Validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете Вашето име и фамилия." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете валиден имейл адрес." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете текст на съобщението." },
        { status: 400 }
      );
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanService = (service || "Общо запитване").trim();
    const cleanMessage = message.trim();
    const nowIso = new Date().toISOString();

    // 1. Send formatted HTML email
    const emailResult = await sendContactEmail({
      name: cleanName,
      email: cleanEmail,
      service: cleanService,
      message: cleanMessage,
    });

    // 2. Also register lead in CRM Bookings/Inquiries Store so Admin gets the lead
    const newInquiry = {
      id: `INQ-${Date.now()}`,
      fullName: cleanName,
      phone: "От контактна форма",
      email: cleanEmail,
      eventDate: nowIso.split("T")[0],
      eventType: `Запитване: ${cleanService}`,
      venueLocation: "Бургас / Онлайн",
      guestCount: 0,
      preferredContact: "email",
      message: `Избрана услуга: ${cleanService}\n\nСъобщение: ${cleanMessage}`,
      status: "new",
      createdAt: nowIso,
      pricing: {
        rentalPrice: 0,
        designPrice: 0,
        distanceKm: 0,
        transportPrice: 0,
        additionalServicesPrice: 0,
        discountAmount: 0,
        depositPaid: 0,
        paymentStatus: "unpaid",
      },
    };

    try {
      const currentBookings = await readCloudOrFileData<any[]>("bookings", []);
      const updatedBookings = [newInquiry, ...currentBookings];
      await writeCloudAndFileData("bookings", updatedBookings);

      // Attempt Supabase direct insert if table exists
      const supabase = await createClient();
      await supabase.from("bookings").insert([
        {
          id: newInquiry.id,
          full_name: cleanName,
          email: cleanEmail,
          phone: "От контактна форма",
          event_type: `Запитване: ${cleanService}`,
          event_date: nowIso.split("T")[0],
          venue_location: "Бургас / Онлайн",
          message: cleanMessage,
          status: "new",
          created_at: nowIso,
        },
      ]);
    } catch (crmErr) {
      console.error("[Contact API] CRM save warning:", crmErr);
    }

    return NextResponse.json({
      success: true,
      message: "Вашето съобщение беше изпратено успешно!",
      emailResult,
    });
  } catch (error: any) {
    console.error("[Contact API] Error processing inquiry:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Възникна непредвидена грешка при изпращането. Моля, опитайте отново.",
      },
      { status: 500 }
    );
  }
}
