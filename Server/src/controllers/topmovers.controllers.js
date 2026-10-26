import { getTopMovers } from "../services/topmovers.service.js";

export async function getTopMoversController(req, res) {
  try {
    const coins = await getTopMovers();

    return res.status(200).json({
      success: true,
      data: coins,
    });
  } catch (error) {
    console.error("Failed to fetch top movers:", error.message);

    return res.status(502).json({
      success: false,
      message: "Unable to fetch cryptocurrency market data.",
    });
  }
}

