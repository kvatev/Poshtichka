import { NextResponse } from "next/server";
import { readCloudOrFileData, writeCloudAndFileData } from "@/lib/server-storage";

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

export const dynamic = "force-dynamic";

export async function GET() {
  const current = await readCloudOrFileData<BookingRecord[]>("bookings", []);
  return NextResponse.json({ bookings: current, success: true });
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

    const current = await readCloudOrFileData<BookingRecord[]>("bookings", []);
    const isAlreadyBooked = current.some(
      (b) => b.eventDate === eventDate && (b.status === "confirmed" || b.status === "deposit_paid")
    );
    if (isAlreadyBooked) {
      return NextResponse.json(
        {
          error: `За съжаление, датата ${eventDate} вече е потвърдена за друго събитие. Моля, изберете друга дата.`,
        },
        { status: 409 }
      );
    }

    const updated = [newRecord, ...current];
    await writeCloudAndFileData("bookings", updated);

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

    const current = await readCloudOrFileData<BookingRecord[]>("bookings", []);
    const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
    await writeCloudAndFileData("bookings", updated);

    return NextResponse.json({ success: true, id, status });
  } catch (err) {
    return NextResponse.json({ error: "Error updating booking status" }, { status: 500 });
  }
}
