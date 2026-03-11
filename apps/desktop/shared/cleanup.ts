export type TargetKind =
  | "application"
  | "directory"
  | "file"
  | "launch-agent"
  | "scheduled-task"
  | "registry-key"
  | "registry-value";

export type TargetCategory =
  | "app"
  | "state"
  | "config"
  | "cache"
  | "logs"
  | "startup"
  | "service"
  | "registry";

export type AppPlatform = "darwin" | "win32" | "linux" | "unknown";

export interface CleanupTarget {
  id: string;
  label: string;
  description: string;
  category: TargetCategory;
  kind: TargetKind;
  path?: string;
  taskName?: string;
  serviceLabel?: string;
  registryPath?: string;
  registryValueName?: string;
}

import type { Lang } from "./i18n";

export interface ScanResult {
  platform: AppPlatform;
  scannedAt: string;
  items: CleanupTarget[];
}

export interface CleanupReportItem {
  target: CleanupTarget;
  success: boolean;
  message: string;
}

export interface CleanupResult {
  finishedAt: string;
  items: CleanupReportItem[];
  reportPath: string | null;
}

export interface CleanClawApi {
  getPlatform: () => Promise<AppPlatform>;
  scan: (lang: Lang) => Promise<ScanResult>;
  clean: (items: CleanupTarget[], lang: Lang) => Promise<CleanupResult>;
}
