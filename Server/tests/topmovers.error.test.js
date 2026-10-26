import { test } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import request from "supertest";
import "dotenv/config";

import { errorHandler } from "../src/middleware/error.middleware.js";

const app = express();

app.get("/success", (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
  });
});

app.get("/error", (req, res, next) => {
  next(new Error("Simulated internal failure"));
});

app.get("/upstream-error", (req, res, next) => {
  const error = new Error("Market data unavailable.");
  error.statusCode = 502;
  next(error);
});

app.use(errorHandler);

test("successful request returns 200", async () => {
  const response = await request(app).get("/success");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
});

test("unexpected error returns generic 500", async () => {
  const response = await request(app).get("/error");

  assert.equal(response.status, 500);
  assert.deepEqual(response.body, {
    success: false,
    message: "Internal server error.",
  });
});

test("upstream error preserves its status code", async () => {
  const response = await request(app).get("/upstream-error");

  assert.equal(response.status, 502);
  assert.deepEqual(response.body, {
    success: false,
    message: "Market data unavailable.",
  });
});

test("internal error details are not exposed", async () => {
  const response = await request(app).get("/error");

  assert.equal(
    response.body.message,
    "Internal server error."
  );
  assert.equal(
    JSON.stringify(response.body).includes("Simulated internal failure"),
    false
  );
});