import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Успешен изход.",
  });

  response.cookies.delete("poshtichka_admin_session");
  return response;
}
