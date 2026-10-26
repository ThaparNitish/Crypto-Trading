import "dotenv/config";
import express from "express";
import cors from "cors";
import cryptoRoutes from "./routes/crypto.routes.js"
import { startTopMoversRefreshJob } from "./jobs/topmovers.refresh.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

startTopMoversRefreshJob()


app.get("/", (req, res) => {
  res.json({ message: "Crypto API is running" });
});

app.use("/api/crypto", cryptoRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
