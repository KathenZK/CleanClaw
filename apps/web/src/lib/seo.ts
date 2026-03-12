import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import { getLocalizedPath, siteUrl } from "@/lib/i18n";

function toAbsolute(path: string) {
  return new URL(path, siteUrl).toString();
}

export function getLocalizedMetadata(
  lang: Lang,
  options: {
    title: string;
    description: string;
    path?: string;
  },
): Metadata {
  const path = options.path ?? "/";
  const canonicalPath = getLocalizedPath(lang, path);
  const openGraphImageUrl = toAbsolute(getLocalizedPath(lang, "/opengraph-image"));

  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: toAbsolute(canonicalPath),
      languages: {
        zh: toAbsolute(getLocalizedPath("zh", path)),
        en: toAbsolute(getLocalizedPath("en", path)),
        "x-default": toAbsolute(getLocalizedPath("zh", path)),
      },
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: toAbsolute(canonicalPath),
      siteName: "CleanClaw",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: "CleanClaw brand image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [openGraphImageUrl],
    },
  };
}
