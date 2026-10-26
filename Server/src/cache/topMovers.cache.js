
import * as cache from "./market.cache.js";

const CACHE_KEY = "top-movers";
const CACHE_TTL = 30 * 1000;

let inFlightRequest = null;

export function getCachedTopMovers() {
  const cachedData = cache.get(CACHE_KEY);

  if (!cachedData) {
    return null;
  }

  return cachedData;
}


export async function getOrRefreshTopMoversCache(fetchTopMovers) {
  const cachedData = getCachedTopMovers();

  if (cachedData) {
    return cachedData;
  }
  
  const staleData = cache.getStale(CACHE_KEY)

  try {
    return await refreshTopMoversCache(fetchTopMovers);
  } catch (error) {
    if (staleData !== null) {
      return staleData;
    }

  throw error;
  }
}


export async function refreshTopMoversCache(fetchTopMovers) {
  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    try {
      const data = await fetchTopMovers();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid or empty Top Movers result");
      }

      cache.set(CACHE_KEY, data, CACHE_TTL);

      return data;
    } finally {
      inFlightRequest = null;
    }
  })();

  return inFlightRequest;
}
