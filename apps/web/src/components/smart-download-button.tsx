"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { macDownloadUrl, windowsDownloadUrl } from "@/lib/site";

type DownloadTarget = {
  href: string;
  external: boolean;
};

type SmartDownloadButtonProps = {
  label: string;
  fallbackHref: string;
  className: string;
};

function detectDownloadTarget(fallbackHref: string): DownloadTarget {
  if (typeof navigator === "undefined") {
    return { href: fallbackHref, external: false };
  }

  const extendedNavigator = navigator as Navigator & {
    userAgentData?: {
      platform?: string;
    };
  };
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = (extendedNavigator.userAgentData?.platform ?? navigator.platform ?? "").toLowerCase();

  if (platform.includes("win") || userAgent.includes("windows")) {
    return { href: windowsDownloadUrl, external: true };
  }

  if (platform.includes("mac") || userAgent.includes("macintosh")) {
    return { href: macDownloadUrl, external: true };
  }

  return { href: fallbackHref, external: false };
}

export function SmartDownloadButton({
  label,
  fallbackHref,
  className,
}: SmartDownloadButtonProps) {
  const [target, setTarget] = useState<DownloadTarget>({
    href: fallbackHref,
    external: false,
  });

  useEffect(() => {
    setTarget(detectDownloadTarget(fallbackHref));
  }, [fallbackHref]);

  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={target.href} className={className}>
      {label}
    </Link>
  );
}
