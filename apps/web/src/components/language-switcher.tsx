"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { Lang } from "@/lib/i18n";

interface LanguageSwitcherProps {
  lang: Lang;
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const redirectTo = query ? `${pathname}?${query}` : pathname;

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-xs text-slate-500">
      {(["zh", "en"] as const).map((value) => {
        const active = value === lang;
        const label = value === "zh" ? "中文" : "EN";

        return (
          <a
            key={value}
            href={`/set-lang?lang=${value}&redirect=${encodeURIComponent(redirectTo)}`}
            className={`rounded-full px-3 py-1.5 transition ${
              active ? "bg-slate-950 text-white" : "hover:text-slate-950"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
