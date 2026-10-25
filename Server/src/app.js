
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Crypto API is running" });
});

app.get("/api/crypto/price", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.BINANCE_BASE_URL}/api/v3/ticker/price?symbol=BTCUSDT`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Binance API request failed",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(502).json({
      error: "Unable to reach Binance",
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
