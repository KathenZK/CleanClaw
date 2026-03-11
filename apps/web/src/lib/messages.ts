import type { Lang } from "@/lib/i18n";
import { en } from "@/messages/en";
import { zh } from "@/messages/zh";

export type Messages = typeof zh;

export function getMessages(lang: Lang): Messages {
  return lang === "en" ? en : zh;
}
