import { contextBridge, ipcRenderer } from "electron";
import type { CleanClawApi, CleanupTarget } from "../shared/cleanup";
import type { Lang } from "../shared/i18n";

const api: CleanClawApi = {
  getPlatform: () => ipcRenderer.invoke("cleanclaw:get-platform"),
  scan: (lang: Lang) => ipcRenderer.invoke("cleanclaw:scan", lang),
  clean: (items: CleanupTarget[], lang: Lang) => ipcRenderer.invoke("cleanclaw:clean", items, lang),
};

contextBridge.exposeInMainWorld("cleanClaw", api);
contextBridge.exposeInMainWorld("__cleanClawPreloadReady", true);
