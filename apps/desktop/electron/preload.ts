import { contextBridge, ipcRenderer } from "electron";
import type { CleanClawApi, CleanupTarget } from "../shared/cleanup";

const api: CleanClawApi = {
  getPlatform: () => ipcRenderer.invoke("cleanclaw:get-platform"),
  scan: () => ipcRenderer.invoke("cleanclaw:scan"),
  clean: (items: CleanupTarget[]) => ipcRenderer.invoke("cleanclaw:clean", items),
};

contextBridge.exposeInMainWorld("cleanClaw", api);
contextBridge.exposeInMainWorld("__cleanClawPreloadReady", true);
