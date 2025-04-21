// Import required modules
import express from 'express';
import cors from 'cors';
import { scrapeAmazonProducts } from './scraper.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(cors());
app.use(express.json());

// Define routes
app.get('/api/scrape', async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({ success: false, message: 'Keyword parameter is required' });
    }
    
    console.log(`Scraping products for keyword: ${keyword}`);
    
    const products = await scrapeAmazonProducts(keyword);
    
    return res.json({
      success: true,
      keyword,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to scrape products'
    });
  }
});

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});