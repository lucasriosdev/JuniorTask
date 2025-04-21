/**
 * Creates product cards and displays them in the results container
 * @param {Array} products - Array of product objects
 */
export function displayProducts(products) {
  const resultsContainer = document.getElementById('results-container');
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    // Generate star rating display
    const ratingStars = generateStarRating(product.rating);
    
    productCard.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          <div class="stars">${ratingStars}</div>
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
      </div>
    `;
    
    resultsContainer.appendChild(productCard);
  });
}

/**
 * Displays an error message to the user
 * @param {string} message - Error message to display
 */
export function displayError(message) {
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

/**
 * Clears all results and error messages
 */
export function clearResults() {
  const resultsContainer = document.getElementById('results-container');
  const errorElement = document.getElementById('error-message');
  
  resultsContainer.innerHTML = '';
  errorElement.style.display = 'none';
}

/**
 * Generates star rating HTML based on the rating value
 * @param {number} rating - Rating value between 0 and 5
 * @returns {string} HTML string with star symbols
 */
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  let starsHtml = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '★';
  }
  
  // Add half star if needed
  if (halfStar) {
    starsHtml += '★';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '☆';
  }
  
  return starsHtml;
}