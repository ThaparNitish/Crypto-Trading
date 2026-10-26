import { refreshTopMovers } from "../services/topmovers.service.js";

const REFRESH_INTERVAL = 30_000;

export function startTopMoversRefreshJob() {
  const refresh = async () => {
    try {
      await refreshTopMovers();
    } catch (error) {
      console.error("[Job] Market refresh failed:", error.message);
    } finally{
      setInterval(refresh, REFRESH_INTERVAL)
    }
  };

  // call when the server starts
  refresh();
}