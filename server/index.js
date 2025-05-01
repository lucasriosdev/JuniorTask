import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
import { scrapeAmazonProducts } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas de API
app.get("/api/scrape", async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res
        .status(400)
        .json({ success: false, message: "Keyword parameter is required" });
    }

    console.log(`Scraping products for keyword: ${keyword}`);

    const products = await scrapeAmazonProducts(keyword);

    return res.json({
      success: true,
      keyword,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to scrape products",
    });
  }
});

// Health check endpoint
app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

// Inicia o servidor utilizando o ViteExpress
ViteExpress.listen(app, PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
