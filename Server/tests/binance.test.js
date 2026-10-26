
import test from "node:test";
import assert from "node:assert/strict";
import { fetchTopMovers } from "../src/services/topmovers.service.js";

test("fetchTopMovers returns the five largest eligible price movements", async (t) => {
  const originalFetch = globalThis.fetch;

  const tickers = [
    { symbol: "BTCUSDT", lastPrice: "80000", priceChangePercent: "-1.2", highPrice: "81000", lowPrice: "79000" },
    { symbol: "ETHUSDT", lastPrice: "2300", priceChangePercent: "2.5", highPrice: "2400", lowPrice: "2200" },
    { symbol: "SOLUSDT", lastPrice: "100", priceChangePercent: "-0.5", highPrice: "105", lowPrice: "98" },
    { symbol: "USDCUSDT", lastPrice: "1", priceChangePercent: "9", highPrice: "1.1", lowPrice: "0.9" },
    { symbol: "XRPUSDT", lastPrice: "2", priceChangePercent: "1.8", highPrice: "2.1", lowPrice: "1.9" },
    { symbol: "DOGEUSDT", lastPrice: "0.2", priceChangePercent: "-0.8", highPrice: "0.21", lowPrice: "0.19" },
    { symbol: "ADAUSDT", lastPrice: "0.5", priceChangePercent: "0.3", highPrice: "0.51", lowPrice: "0.49" },
  ];

  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  globalThis.fetch = async () => ({
    ok: true,
    json: async () => tickers,
  });

  const result = await fetchTopMovers();

  assert.deepEqual(
    result.map((coin) => coin.symbol),
    ["ETH", "XRP", "BTC", "DOGE", "SOL"]
  );

  assert.equal(result.length, 5);
  assert.equal(result[0].price, 2300);
  assert.equal(result[0].priceChangePercent, 2.5);
});
