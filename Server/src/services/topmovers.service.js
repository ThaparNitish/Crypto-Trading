import { getOrRefreshTopMoversCache, refreshTopMoversCache } from "../cache/topMovers.cache.js";
import { get24HourTicker } from "../provider/binance/binance.provider.js";

const EXCLUDED_ASSETS = new Set([
  "USDC",
  "FDUSD",
  "TUSD",
  "USDE",
  "USDP",
  "DAI",
  "BUSD",
]);

function getTop5(tickers) {
  return tickers
    .filter((ticker) => {
      if (!ticker.symbol.endsWith("USDT")) {
        return false;
      }

      const baseAsset = ticker.symbol.slice(0, -4);
      return !EXCLUDED_ASSETS.has(baseAsset);
    })
    .sort(
      (a, b) => Number(b.quoteVolume) - Number(a.quoteVolume)
    )
    .slice(0, 5)
    .map((ticker) => ({
      symbol: ticker.symbol.slice(0, -4),
      price: Number(ticker.lastPrice),
      priceChangePercent: Number(ticker.priceChangePercent),
    }));
}

export async function fetchTopMovers() {
  console.log("[Cache] MISS - Calling API");

  const tickers = await get24HourTicker();
  console.log("got result from api")

  return getTop5(tickers);
}

export function getTopMovers() {
  return getOrRefreshTopMoversCache(fetchTopMovers);
}

export function refreshTopMovers() {
  return refreshTopMoversCache(fetchTopMovers);
}
