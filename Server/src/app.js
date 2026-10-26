import "dotenv/config";
import express from "express";
import cors from "cors";
import cryptoRoutes from "./routes/crypto.routes.js"
import { startMarketRefresh } from "./jobs/topmovers.refresh.js";

const app = express();

app.use(cors());
app.use(express.json());

startMarketRefresh()


app.get("/", (req, res) => {
  res.json({ message: "Crypto API is running" });
});

app.use("/api/crypto", cryptoRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
