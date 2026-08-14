import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  try {
    if (q) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        q
      )}&countrycodes=bg&accept-language=bg&limit=8`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "PoshtichkaApp/1.0 (info@poshtichka.bg)",
          "Accept-Language": "bg,en",
        },
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    }

    if (lat && lng) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=bg`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": "PoshtichkaApp/1.0 (info@poshtichka.bg)",
          "Accept-Language": "bg,en",
        },
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    }

    return NextResponse.json([]);
  } catch (err) {
    console.error("Geocoding proxy error:", err);
    return NextResponse.json([]);
  }
}
