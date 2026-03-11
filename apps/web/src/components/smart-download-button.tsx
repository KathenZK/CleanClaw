"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { macArm64DownloadUrl, macX64DownloadUrl, windowsDownloadUrl } from "@/lib/site";

type DownloadTarget = {
  href: string;
  external: boolean;
};

type SmartDownloadButtonProps = {
  label: string;
  fallbackHref: string;
  className: string;
};

type NavigatorWithUAData = Navigator & {
  userAgentData?: {
    platform?: string;
    getHighEntropyValues?: (
      hints: string[],
    ) => Promise<{
      architecture?: string;
      bitness?: string;
      platform?: string;
    }>;
  };
};

function getWebGlRenderer(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl || !("getExtension" in gl) || !("getParameter" in gl)) {
      return "";
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

    if (!debugInfo) {
      return "";
    }

    return String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? "").toLowerCase();
  } catch {
    return "";
  }
}

async function detectDownloadTarget(fallbackHref: string): Promise<DownloadTarget> {
  if (typeof navigator === "undefined") {
    return { href: fallbackHref, external: false };
  }

  const extendedNavigator = navigator as NavigatorWithUAData;
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = (extendedNavigator.userAgentData?.platform ?? navigator.platform ?? "").toLowerCase();

  if (platform.includes("win") || userAgent.includes("windows")) {
    return { href: windowsDownloadUrl, external: true };
  }

  if (platform.includes("mac") || userAgent.includes("macintosh")) {
    const highEntropyValues = await extendedNavigator.userAgentData?.getHighEntropyValues?.([
      "architecture",
      "bitness",
      "platform",
    ]);
    const architecture = highEntropyValues?.architecture?.toLowerCase() ?? "";
    const renderer = getWebGlRenderer();

    if (architecture.includes("arm")) {
      return { href: macArm64DownloadUrl, external: true };
    }

    if (architecture.includes("x86")) {
      return { href: macX64DownloadUrl, external: true };
    }

    if (renderer.includes("apple") || /\bm\d\b/.test(renderer)) {
      return { href: macArm64DownloadUrl, external: true };
    }

    if (
      renderer.includes("intel") ||
      renderer.includes("amd") ||
      renderer.includes("radeon") ||
      renderer.includes("nvidia")
    ) {
      return { href: macX64DownloadUrl, external: true };
    }

    return { href: fallbackHref, external: false };
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
    let isMounted = true;

    void detectDownloadTarget(fallbackHref).then((resolvedTarget) => {
      if (isMounted) {
        setTarget(resolvedTarget);
      }
    });

    return () => {
      isMounted = false;
    };
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
