
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "dotenv/config";

import * as cache from "../src/cache/market.cache.js";
import {
  getOrRefreshTopMoversCache,
  refreshTopMoversCache,
} from "../src/cache/topMovers.cache.js";

const coins = [
  { symbol: "BTC", price: 100000, priceChangePercent: 2 },
  { symbol: "ETH", price: 3000, priceChangePercent: 1 },
];

beforeEach(() => {
  cache.clear();
});

test("cache miss fetches and stores data", async () => {
  let calls = 0;

  const fetchData = async () => {
    calls++;
    return coins;
  };

  const result = await getOrRefreshTopMoversCache(fetchData);

  assert.deepEqual(result, coins);
  assert.deepEqual(cache.get("top-movers"), coins);
  assert.equal(calls, 1);
});

test("cache hit does not fetch again", async () => {
  await refreshTopMoversCache(async () => coins);

  let calls = 0;

  const result = await getOrRefreshTopMoversCache(async () => {
    calls++;
    return [];
  });

  assert.deepEqual(result, coins);
  assert.equal(calls, 0);
});

test("concurrent requests share one fetch", async () => {
  let calls = 0;

  const fetchData = async () => {
    calls++;
    await new Promise((resolve) => setTimeout(resolve, 100));
    return coins;
  };

  const [first, second] = await Promise.all([
    getOrRefreshTopMoversCache(fetchData),
    getOrRefreshTopMoversCache(fetchData),
  ]);

  assert.deepEqual(first, coins);
  assert.deepEqual(second, coins);
  assert.equal(calls, 1);
});

test("forced refresh replaces cached data", async () => {
  await refreshTopMoversCache(async () => coins);

  const updatedCoins = [
    { symbol: "SOL", price: 200, priceChangePercent: 5 },
  ];

  const result = await refreshTopMoversCache(async () => updatedCoins);

  assert.deepEqual(result, updatedCoins);
  assert.deepEqual(cache.get("top-movers"), updatedCoins);
});

test("failed fetch can be retried", async () => {
  await assert.rejects(
    refreshTopMoversCache(async () => {
      throw new Error("Simulated API failure");
    }),
    /Simulated API failure/
  );

  const result = await getOrRefreshTopMoversCache(async () => coins);

  assert.deepEqual(result, coins);
});
