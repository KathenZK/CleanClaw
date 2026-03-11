"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

interface LanguageSwitcherProps {
  lang: Lang;
  labels: {
    zh: string;
    en: string;
  };
}

export function LanguageSwitcher({ lang, labels }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  function getHref(nextLang: Lang) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Lang)) {
      segments[0] = nextLang;
    } else {
      segments.unshift(nextLang);
    }

    const nextPath = `/${segments.join("/")}`;
    return query ? `${nextPath}?${query}` : nextPath;
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-xs text-slate-500">
      {(["zh", "en"] as const).map((value) => {
        const active = value === lang;
        const label = labels[value];

        return (
          <Link
            key={value}
            href={getHref(value)}
            className={`rounded-full px-3 py-1.5 transition ${
              active ? "bg-slate-950 text-white" : "hover:text-slate-950"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
