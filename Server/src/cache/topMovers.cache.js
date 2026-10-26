
import * as cache from "./market.cache.js";

const CACHE_KEY = "top-movers";
const CACHE_TTL = 30 * 1000;

let inFlightRequest = null;

export function getCachedTopMovers() {
  const cachedData = cache.get(CACHE_KEY);

  if (!cachedData) {
    console.log("No Cache")
    return null;
  }
  console.log("Already Cached")

  return cachedData;
}


export async function getOrRefreshTopMoversCache(fetchTopMovers) {
  const cachedData = getCachedTopMovers();

  if (cachedData) {
    return cachedData;
  }

  return await refreshTopMoversCache(fetchTopMovers);
}


export async function refreshTopMoversCache(fetchTopMovers) {
  if (inFlightRequest) {
    console.log("[Cache] Sharing in-flight request");
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    try {
      const data = await fetchTopMovers();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid or empty Top Movers result");
      }

      cache.set(CACHE_KEY, data, CACHE_TTL);

      console.log("[Cache] UPDATED");

      return data;
    } finally {
      inFlightRequest = null;
    }
  })();

  return inFlightRequest;
}
