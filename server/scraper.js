// Import required modules
import axios from 'axios';
import { JSDOM } from 'jsdom';

/**
 * Scrapes Amazon search results for a given keyword
 * @param {string} keyword - The search term to look for on Amazon
 * @returns {Promise<Array>} - Array of product objects
 */
export async function scrapeAmazonProducts(keyword) {
  try {
    // Format the keyword for URL
    const formattedKeyword = encodeURIComponent(keyword.trim());
    
    // Define the URL to scrape
    const url = `https://www.amazon.com/s?k=${formattedKeyword}`;
    
    // Set up headers to mimic a browser
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
    };
    
    console.log(`Fetching data from: ${url}`);
    
    // Make the request to Amazon
    const response = await axios.get(url, { headers });
    
    // Parse the HTML content
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    // Select all product elements
    const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');
    
    console.log(`Found ${productElements.length} product elements`);
    
    // Array to store the scraped products
    const products = [];
    
    // Loop through each product element and extract data
    productElements.forEach((element) => {
      try {
        // Extract product title
        const titleElement = element.querySelector('h2 a span');
        const title = titleElement ? titleElement.textContent.trim() : 'No title available';
        
        // Extract rating
        const ratingElement = element.querySelector('i.a-icon-star-small span');
        let rating = 0;
        if (ratingElement) {
          const ratingText = ratingElement.textContent.trim();
          const ratingMatch = ratingText.match(/([0-9.]+) out of/);
          rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
        }
        
        // Extract review count
        const reviewCountElement = element.querySelector('span.a-size-base.s-underline-text');
        const reviewCountText = reviewCountElement ? reviewCountElement.textContent.trim() : '0';
        const reviewCount = reviewCountText.replace(/[(),]/g, '');
        
        // Extract image URL
        const imageElement = element.querySelector('img.s-image');
        const imageUrl = imageElement ? imageElement.getAttribute('src') : '';
        
        // Add the product to our array if it has a title and image
        if (title !== 'No title available' && imageUrl) {
          products.push({
            title,
            rating,
            reviewCount,
            imageUrl
          });
        }
      } catch (err) {
        console.error('Error processing product element:', err);
      }
    });
    
    console.log(`Successfully scraped ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error in scrapeAmazonProducts:', error);
    throw new Error('Failed to scrape Amazon products: ' + error.message);
  }
}