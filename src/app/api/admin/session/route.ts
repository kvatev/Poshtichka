import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("poshtichka_admin_session")?.value;

  if (sessionToken === "authenticated_admin_session_v1") {
    return NextResponse.json({
      authenticated: true,
      user: {
        username: "admin",
        role: "Administrator",
        name: "Администратор Пощичка",
      },
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
