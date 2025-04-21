import './style.css';
import { displayProducts, displayError, clearResults } from './components/productDisplay.js';
import { toggleLoader } from './components/loader.js';

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const keywordInput = document.getElementById('keyword');

// Function to scrape products based on keyword
async function scrapeProducts(keyword) {
  if (!keyword.trim()) {
    displayError('Please enter a keyword to search');
    return;
  }

  try {
    toggleLoader(true);
    clearResults();
    
    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to scrape products');
    }
    
    const data = await response.json();
    
    if (data.products && data.products.length > 0) {
      displayProducts(data.products);
    } else {
      displayError('No products found for this keyword');
    }
  } catch (error) {
    console.error('Error:', error);
    displayError(error.message || 'An error occurred while scraping products');
  } finally {
    toggleLoader(false);
  }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
  scrapeProducts(keywordInput.value);
});

keywordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    scrapeProducts(keywordInput.value);
  }
});

// Initialize the app
function init() {
  // Ensure the loader is hidden on page load
  toggleLoader(false);
  
  // Focus the input field
  keywordInput.focus();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);