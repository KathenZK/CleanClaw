import type { CleanClawApi } from "../shared/cleanup";

declare global {
  interface Window {
    cleanClaw: CleanClawApi;
  }
}

export {};
