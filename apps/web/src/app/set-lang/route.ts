import { NextResponse } from "next/server";
import { getLangCookieName, normalizeLang } from "@/lib/i18n";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = normalizeLang(url.searchParams.get("lang"));
  const redirect = url.searchParams.get("redirect") || "/";

  const response = NextResponse.redirect(new URL(redirect, url.origin));
  response.cookies.set(getLangCookieName(), lang, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
