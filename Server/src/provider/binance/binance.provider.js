import "dotenv/config"

const BINANCE_BASE_URL = process.env.BINANCE_BASE_URL;


export async function get24HourTicker() {
  const response = await fetch(
    `${BINANCE_BASE_URL}/api/v3/ticker/24hr`
  );

  if (!response.ok) {
    throw new Error(`Binance API error: ${response.status}`);
  }

  return response.json();
}
  