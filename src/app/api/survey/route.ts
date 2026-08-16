import { NextRequest, NextResponse } from "next/server";
import { sendSurveyEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventType,
      names,
      fullName,
      eventDate,
      phone,
      email,
      guestCount,
      location,
      venueLocation,
      paperTypes,
      paperKeepsakes,
      preferredChannel,
      preferredContact,
      instagramHandle,
    } = body;

    const clientNames = (names || fullName || "").trim();
    const clientPhone = (phone || "").trim();
    const clientEmail = (email || "").trim().toLowerCase();
    const clientDate = (eventDate || "").trim();
    const clientLocation = (location || venueLocation || "").trim();
    const clientGuests = Number(guestCount) || 100;
    const clientEventType = (eventType || "Сватбено тържество").trim();
    const rawPapers = paperTypes || paperKeepsakes || [];
    const clientPaperTypes = Array.isArray(rawPapers) ? rawPapers : [String(rawPapers)];
    const clientChannel = (preferredChannel || preferredContact || "viber").trim();
    const clientInstagramHandle = instagramHandle ? String(instagramHandle).trim() : undefined;

    // Validation
    if (!clientNames) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете имена." },
        { status: 400 }
      );
    }

    if (!clientDate) {
      return NextResponse.json(
        { success: false, error: "Моля, изберете дата на събитието." },
        { status: 400 }
      );
    }

    if (!clientPhone || clientPhone.length < 5) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете валиден телефонен номер." },
        { status: 400 }
      );
    }

    if (!clientEmail || !clientEmail.includes("@") || !clientEmail.includes(".")) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете валиден имейл адрес." },
        { status: 400 }
      );
    }

    if (!clientLocation) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете точна локация на събитието." },
        { status: 400 }
      );
    }

    if (clientChannel.toLowerCase() === "instagram" && !clientInstagramHandle) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете Вашето Instagram потребителско име." },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();

    // 1. Dispatch rich HTML email via Zoho Nodemailer SMTP
    const emailResult = await sendSurveyEmail({
      eventType: clientEventType,
      names: clientNames,
      eventDate: clientDate,
      phone: clientPhone,
      email: clientEmail,
      guestCount: clientGuests,
      location: clientLocation,
      paperTypes: clientPaperTypes,
      preferredChannel: clientChannel,
      instagramHandle: clientInstagramHandle,
    });

    // 2. Safe CRM Registration in Supabase (Zero local filesystem disk writes)
    const newRecord = {
      id: `SRV-${Date.now()}`,
      fullName: clientNames,
      phone: clientPhone,
      email: clientEmail,
      eventDate: clientDate,
      eventType: clientEventType,
      venueLocation: clientLocation,
      guestCount: clientGuests,
      preferredContact: clientChannel,
      message: `Попълнена АНКЕТА:\n• Формати: ${clientPaperTypes.join(", ")}\n• Предпочитан контакт: ${clientChannel}${
        clientInstagramHandle ? ` (@${clientInstagramHandle.replace(/^@+/, "")})` : ""
      }`,
      status: "pending",
      createdAt: nowIso.split("T")[0],
    };

    try {
      const current = await readCloudOrFileData<any[]>("bookings", []);
      const updated = [newRecord, ...current];
      await writeCloudAndFileData("bookings", updated);

      const supabase = await createClient();
      await supabase.from("bookings").insert([
        {
          id: newRecord.id,
          full_name: clientNames,
          phone: clientPhone,
          email: clientEmail,
          event_date: clientDate,
          event_type: clientEventType,
          venue_location: clientLocation,
          message: newRecord.message,
          status: "pending",
          created_at: nowIso,
        },
      ]);
    } catch (crmErr) {
      console.warn("[Survey API] Non-fatal CRM log notice:", crmErr);
    }

    return NextResponse.json({
      success: true,
      message: "Вашата анкета беше изпратена успешно!",
      emailResult,
    });
  } catch (error: any) {
    console.error("[Survey API] Error processing survey:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Възникна непредвидена грешка при изпращането на анкетата. Моля, опитайте отново.",
      },
      { status: 500 }
    );
  }
}
