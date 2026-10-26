import { refreshTopMovers } from "../services/topmovers.service.js";

const REFRESH_INTERVAL = 30_000;

export function startTopMoversRefreshJob() {
  const refresh = async () => {
    try {
      console.log("[Job] Top Movers refresh started")
      await refreshTopMovers();
      console.log("[Job] Top Movers refreshed");
    } catch (error) {
      console.error("[Job] Market refresh failed:", error.message);
    }
  };

  // call when the server starts
  refresh();

  // Refresh ever 30s
  setInterval(refresh, REFRESH_INTERVAL);
}