import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { app, BrowserWindow, ipcMain } from "electron";
import { cleanTargets, formatReport, scanOpenClaw } from "./openclaw";
import type { AppPlatform, CleanupTarget } from "../shared/cleanup";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | null = null;

function getPlatform(): AppPlatform {
  if (process.platform === "darwin" || process.platform === "win32" || process.platform === "linux") {
    return process.platform;
  }

  return "unknown";
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 760,
    minWidth: 960,
    minHeight: 680,
    title: "CleanClaw",
    backgroundColor: "#f3f6fb",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

ipcMain.handle("cleanclaw:get-platform", async () => getPlatform());

ipcMain.handle("cleanclaw:scan", async () => scanOpenClaw());

ipcMain.handle("cleanclaw:clean", async (_event, items: CleanupTarget[]) => {
  const results = await cleanTargets(items);
  const reportPath = path.join(
    app.getPath("desktop"),
    `CleanClaw-Report-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`,
  );

  await fs.writeFile(reportPath, formatReport(results), "utf8");

  return {
    finishedAt: new Date().toISOString(),
    items: results,
    reportPath,
  };
});

app.whenReady().then(async () => {
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
