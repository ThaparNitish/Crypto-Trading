import express from "express";
import { getTopMoversController } from "../controllers/topmovers.controllers.js";

const router = express.Router();

router.get("/top-movers", getTopMoversController);

export default router;
