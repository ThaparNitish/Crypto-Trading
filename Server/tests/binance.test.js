import "dotenv/config";
import { getTopMovers } from "../src/services/topmovers.service.js";


async function test() {
  try {
    const coins = await getTopMovers();
    console.log(coins);
  } catch (error) {
    console.error("Failed to get top movers:", error.message);
  }
}

test();
