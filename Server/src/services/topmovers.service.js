
import { get24HourTicker } from "../provider/binance/binance.provider.js";
import * as cache from "../cache/market.cache.js";

let inFlightRequest = null;

export async function getTopMovers() {
  const cachedData = cache.get("top-movers");

  if (cachedData) {
    console.log("[Cache] HIT");
    return cachedData;
  }

  if (inFlightRequest) {
    console.log("[Cache] REFRESH IN PROGRESS - sharing request");
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    try {
      console.log("[Cache] MISS - Calling API");

      const tickers = await get24HourTicker();


      console.log(
        "[Binance] BTCUSDT:",
        tickers.find((ticker) => ticker.symbol === "BTCUSDT")?.lastPrice
      );

      const excludedAssets = new Set([
        "USDC", "FDUSD", "TUSD", "USDE", "USDP", "DAI", "BUSD"
      ]);

      const eligibleTickers = tickers.filter((ticker) => {
        if (!ticker.symbol.endsWith("USDT")) {
          return false;
        }

        const baseAsset = ticker.symbol.slice(0, -4);
        return !excludedAssets.has(baseAsset);
      });

      eligibleTickers.sort(
        (a, b) => Number(b.quoteVolume) - Number(a.quoteVolume)
      );

      const result = eligibleTickers.slice(0, 5).map((ticker) => ({
        symbol: ticker.symbol.slice(0, -4),
        price: Number(ticker.lastPrice),
        priceChangePercent: Number(ticker.priceChangePercent),
      }));

      cache.set("top-movers", result);

      console.log("[Cache] UPDATED");
      return result;
    } finally {
      inFlightRequest = null;
    }
  })();

  return inFlightRequest;
}
