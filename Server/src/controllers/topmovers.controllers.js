import { getTopMovers } from "../services/topmovers.service.js";

export async function getTopMoversController(req, res, next) {
  const coins = await getTopMovers();

  return res.status(200).json({
    success: true,
    data: coins,
  });
}

