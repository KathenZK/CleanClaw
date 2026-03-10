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
  scan: () => Promise<ScanResult>;
  clean: (items: CleanupTarget[]) => Promise<CleanupResult>;
}

export const categoryLabels: Record<TargetCategory, string> = {
  app: "应用本体",
  state: "状态目录",
  config: "配置",
  cache: "缓存",
  logs: "日志",
  startup: "自启动",
  service: "后台服务",
  registry: "注册表",
};
