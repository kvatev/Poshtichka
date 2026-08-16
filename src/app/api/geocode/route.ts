import { NextRequest, NextResponse } from "next/server";

interface PhotonFeature {
  type: string;
  geometry: {
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    name?: string;
    osm_key?: string;
    osm_value?: string;
    type?: string;
    city?: string;
    town?: string;
    village?: string;
    district?: string;
    county?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    postcode?: string;
    street?: string;
    housenumber?: string;
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  try {
    // 1. FORWARD SEARCH (Query by place/village/city/address)
    if (q && q.trim()) {
      const cleanQ = q.trim();
      const results: Array<{
        display_name: string;
        lat: string;
        lon: string;
        type: string;
        name: string;
        address: {
          village?: string;
          city?: string;
          town?: string;
          municipality?: string;
          county?: string;
          state?: string;
          country?: string;
        };
      }> = [];

      // A. Query Photon (Komoot OSM engine - fast, unlimited, comprehensive BG settlements index)
      try {
        const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQ)}&limit=15`;
        const photonRes = await fetch(photonUrl, {
          headers: {
            "User-Agent": "PoshtichkaWeb/2.0 (info@poshtichka.eu)",
            "Accept": "application/json",
          },
          next: { revalidate: 3600 },
        });

        if (photonRes.ok) {
          const photonData = await photonRes.json();
          if (photonData && Array.isArray(photonData.features)) {
            photonData.features.forEach((f: PhotonFeature) => {
              const p = f.properties;
              if (!f.geometry || !f.geometry.coordinates) return;

              // Filter for Bulgaria if countrycode is present or coords roughly match BG bounding box [41.2, 22.3] to [44.3, 28.6]
              const [lon, latCoord] = f.geometry.coordinates;
              const isBgCoords =
                latCoord >= 41.0 && latCoord <= 44.5 && lon >= 22.0 && lon <= 29.0;
              const isBgCountry =
                !p.countrycode ||
                p.countrycode.toUpperCase() === "BG" ||
                (p.country && /българ|bulgaria/i.test(p.country));

              if (!isBgCoords && !isBgCountry) return;

              const isVillage = p.osm_value === "village" || p.type === "village";
              const isTown = p.osm_value === "town" || p.type === "town";
              const isCity = p.osm_value === "city" || p.type === "city";

              const typePrefix = isVillage ? "с. " : isTown || isCity ? "гр. " : "";
              const placeName = p.name || p.city || p.town || p.village || cleanQ;

              const descParts = [
                `${typePrefix}${placeName}`,
                p.district,
                p.county ? `общ. ${p.county}` : undefined,
                p.state ? `обл. ${p.state}` : undefined,
                "България",
              ].filter(Boolean);

              const displayName = descParts.join(", ");

              results.push({
                display_name: displayName,
                lat: String(latCoord),
                lon: String(lon),
                type: p.osm_value || p.type || "place",
                name: placeName,
                address: {
                  village: isVillage ? placeName : p.village,
                  city: isCity ? placeName : p.city,
                  town: isTown ? placeName : p.town,
                  municipality: p.county,
                  county: p.county,
                  state: p.state,
                  country: p.country || "България",
                },
              });
            });
          }
        }
      } catch (err) {
        console.warn("Photon search error:", err);
      }

      // B. Fallback to Nominatim if results are sparse
      if (results.length === 0) {
        try {
          const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            cleanQ
          )}&countrycodes=bg&accept-language=bg&addressdetails=1&limit=10`;

          const nomRes = await fetch(nominatimUrl, {
            headers: {
              "User-Agent": "PoshtichkaPlatform/2.0 (info@poshtichka.eu)",
              "Accept-Language": "bg,en",
            },
            next: { revalidate: 3600 },
          });

          if (nomRes.ok) {
            const nomData = await nomRes.json();
            if (Array.isArray(nomData)) {
              nomData.forEach((d: any) => {
                results.push({
                  display_name: d.display_name,
                  lat: String(d.lat),
                  lon: String(d.lon),
                  type: d.type || "place",
                  name: d.name || cleanQ,
                  address: d.address || {},
                });
              });
            }
          }
        } catch (err) {
          console.warn("Nominatim fallback error:", err);
        }
      }

      return NextResponse.json(results);
    }

    // 2. REVERSE GEOCODING (Coordinates to Village/City Name)
    if (lat && lng) {
      const numLat = Number(lat);
      const numLng = Number(lng);

      // A. Query Photon Reverse
      try {
        const photonRevUrl = `https://photon.komoot.io/reverse?lat=${numLat}&lon=${numLng}`;
        const photonRevRes = await fetch(photonRevUrl, {
          headers: {
            "User-Agent": "PoshtichkaWeb/2.0 (info@poshtichka.eu)",
            "Accept": "application/json",
          },
          next: { revalidate: 3600 },
        });

        if (photonRevRes.ok) {
          const revData = await photonRevRes.json();
          if (revData && Array.isArray(revData.features) && revData.features.length > 0) {
            const f: PhotonFeature = revData.features[0];
            const p = f.properties;
            const isVillage = p.osm_value === "village" || p.type === "village";
            const placeName = p.name || p.city || p.town || p.village || "";

            return NextResponse.json({
              display_name: [placeName, p.county, p.state, "България"].filter(Boolean).join(", "),
              lat: String(numLat),
              lon: String(numLng),
              name: placeName,
              address: {
                village: isVillage ? placeName : p.village,
                city: p.city || (!isVillage ? placeName : undefined),
                town: p.town,
                municipality: p.county,
                county: p.county,
                state: p.state,
                country: p.country || "България",
              },
            });
          }
        }
      } catch (err) {
        console.warn("Photon reverse geocode error:", err);
      }

      // B. Fallback to Nominatim Reverse
      try {
        const nomRevUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${numLat}&lon=${numLng}&accept-language=bg`;
        const nomRevRes = await fetch(nomRevUrl, {
            headers: {
              "User-Agent": "PoshtichkaPlatform/2.0 (info@poshtichka.eu)",
              "Accept-Language": "bg,en",
            },
          next: { revalidate: 3600 },
        });

        if (nomRevRes.ok) {
          const data = await nomRevRes.json();
          return NextResponse.json(data);
        }
      } catch {}
    }

    return NextResponse.json([]);
  } catch (err) {
    console.error("Geocoding proxy error:", err);
    return NextResponse.json([]);
  }
}
