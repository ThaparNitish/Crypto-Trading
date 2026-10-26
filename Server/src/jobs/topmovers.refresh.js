import { getTopMovers } from "../services/topmovers.service.js";

const REFRESH_INTERVAL = 30_000;

export function startMarketRefresh() {
  const refresh = async () => {
    try {
      await getTopMovers();
      console.log("[Job] Market cache refreshed");
    } catch (error) {
      console.error("[Job] Market refresh failed:", error.message);
    }
  };

  // call when the server starts
  refresh();

  // Refresh ever 30s
  setInterval(refresh, REFRESH_INTERVAL);
}