import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === "admin" && password === "Jakshuka123#@!") {
      const response = NextResponse.json({
        success: true,
        message: "Успешен вход в административния панел.",
      });

      // Set HTTP-only cookie valid for 7 days
      response.cookies.set("poshtichka_admin_session", "authenticated_admin_session_v1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: "Грешно потребителско име или парола." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Възникна непредвидена грешка при входа." },
      { status: 500 }
    );
  }
}
