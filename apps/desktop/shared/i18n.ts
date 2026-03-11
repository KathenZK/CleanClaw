export type Lang = "zh" | "en";

export function normalizeLang(value?: string | null): Lang {
  if (!value) {
    return "zh";
  }

  return value.toLowerCase().startsWith("en") ? "en" : "zh";
}
