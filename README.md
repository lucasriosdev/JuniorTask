# Amazon Product Scraper

A simple web application that scrapes product information from Amazon search results. This project uses Bun with Express, Axios, and JSDOM for the backend, and Vanilla JavaScript with Vite for the frontend.

## Features

- Search for products on Amazon by keyword
- Extract product titles, ratings, review counts, and images
- Display the scraped data in a clean, card-based interface
- Responsive design that works on all devices

## Tech Stack

- **Backend:**
  - Bun
  - Express.js
  - Axios
  - JSDOM
  - CORS

- **Frontend:**
  - HTML/CSS
  - Vanilla JavaScript
  - Vite

## Project Structure

```
project/
├── client/             # Frontend (Vite)
│   ├── index.html
│   └── src/
│       ├── main.js
│       ├── style.css
│       └── components/
│           ├── loader.js
│           └── productDisplay.js
├── server/             # Backend (Bun)
│   ├── index.js        # Express server setup
│   └── scraper.js      # Amazon scraping logic
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Setup Instructions

### Prerequisites

- Bun installed (https://bun.sh/)
- Node.js and npm installed (for Vite)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd amazon-product-scraper
   ```

2. Install dependencies
   ```bash
   bun install
   ```

### Running the Application

1. Start the backend server
   ```bash
   bun run dev:server
   ```

2. In a new terminal, start the frontend development server
   ```bash
   bun run dev:client
   ```

3. Alternatively, run both simultaneously
   ```bash
   bun run dev
   ```

4. Open your browser and navigate to:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/scrape?keyword=yourKeyword

## API Endpoints

- `GET /api/scrape?keyword=yourKeyword`: Scrapes Amazon for products matching the keyword
- `GET /health`: Health check endpoint to verify server status

## Important Notes

- This scraper is for educational purposes only
- Amazon may block requests if too many are made in a short period
- Be respectful of Amazon's terms of service and robots.txt
- The web scraper may break if Amazon changes its page structure

## Error Handling

The application handles various errors including:
- Missing keywords
- Failed scraping attempts
- No products found
- Network issues

## License

This project is for educational purposes only.