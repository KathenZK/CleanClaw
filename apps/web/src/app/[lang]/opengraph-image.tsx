import { notFound } from "next/navigation";
import { createOpenGraphImage } from "@/lib/opengraph";
import { isLang } from "@/lib/i18n";

export const alt = "CleanClaw";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  return createOpenGraphImage(lang);
}
