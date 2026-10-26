import "dotenv/config"

const BINANCE_BASE_URL = process.env.BINANCE_BASE_URL;


export async function get24HourTicker() {
  try{
  const response = await fetch(
    `${BINANCE_BASE_URL}/api/v3/ticker/24hr`,
    {signal: AbortSignal.timeout(10_000)}
  );

  if (!response.ok) {
    const error = new Error("Market data unavailable.");
    error.statusCode = 502;
    throw error;
  }

  return response.json();
  }catch(error){
    if (error.name === "TimeoutError") {
      const timeoutError = new Error("Market data request timed out.");
      timeoutError.statusCode = 504;
      throw timeoutError;
    }

    throw error;
  }
}
  