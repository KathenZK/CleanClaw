import { cookies } from "next/headers";

export type Lang = "zh" | "en";

const langCookieName = "cleanclaw-lang";

export function normalizeLang(value?: string | null): Lang {
  return value === "en" ? "en" : "zh";
}

export async function getRequestLang(): Promise<Lang> {
  const cookieStore = await cookies();
  return normalizeLang(cookieStore.get(langCookieName)?.value);
}

export function getLangCookieName() {
  return langCookieName;
}
