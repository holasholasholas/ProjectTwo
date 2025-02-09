# Project: Stock Portfolio Tracker App

## Description

The **Stock Portfolio Tracker App** is a React-based web application designed to help users track their stock investments, calculate profit and loss, and manage a watchlist of stocks. The app integrates with the Alpha Vantage API to fetch real-time stock data and allows users to add stocks to their watchlist, view stock details, and calculate profit/loss for their investments.

---

## User Story

- As a user, I want to search for prices of stocks in the US
- As a user, I want to be able to save them onto a watchlist
- As a user, I need to calculate and check my P&L based on latest prices 

## Features

1. **Home Page**:

   - A landing page for the app.

2. **Stock Search**:

   - Search for stocks by ticker symbol using the Alpha Vantage API.
   - View detailed stock information, including:
     - Symbol
     - Price
     - Open, High, Low, and Close prices
     - Change percentage
     - Volume
     - Latest trading day
   - Add stocks to the watchlist.

3. **Watchlist**:

   - View a list of stocks added to the watchlist.
   - Track saved stocks and their details.

4. **Profit/Loss Calculator**:

   - Calculate the profit or loss for a stock position by entering:
     - Ticker symbol
     - Buy price
     - Sell price
     - Quantity
   - View a table of results with:
     - Symbol
     - Buy price
     - Current price
     - Quantity
     - Profit/Loss (color-coded for easy identification).

5. **Navigation**:
   - A navigation bar for easy access to all features.

---

## Technologies Used

- **Frontend**:

  - React (with React Router for navigation)
  - CSS for styling

- **APIs**:

  - Alpha Vantage API for fetching stock data.

- **State Management**:

  - React's `useState` for managing component state.

- **Backend**:
  - Airtable

---

## Folder Structure

```
stock-portfolio-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── SingleTick.jsx
│   │   ├── ProfitLossCal.jsx
│   │   ├── WatchList.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
├── .env
├── package.json
├── README.md
```

---

## Usage

1. **Search for Stocks**:

   - Navigate to the **Search** page.
   - Enter a stock ticker symbol (e.g., AAPL, TSLA).
   - View the stock details and add it to your watchlist.

2. **View Watchlist**:

   - Go to the **Watchlist** page to see all the stocks you've added.

3. **Calculate Profit/Loss**:
   - Visit the **Calculator** page.
   - Enter the stock symbol, buy price, sell price, and quantity.
   - View the calculated profit or loss in the results table.

---

## Pesudocode

### State Management

```javascript
const [watchlist, setWatchlist] = useState([]); 
const [savedStocks, setSavedStocks] = useState([]); 
const [realWatchlist, setRealWatchlist] = useState({});
const [ticker, setTicker] = useState("");
const [stockData, setStockData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### Adding a Stock to the Watchlist

```javascript
const addToWatchlist = (stock) => {
  const isAlreadyInWatchlist = watchlist.some(
    (item) => item.symbol === stock.symbol
  );

  if (isAlreadyInWatchlist) {
    alert("This stock is already in your watchlist.");
    return false;
  } else {
    setWatchlist([...watchlist, stock]);
    return true;
  }
};
```

### Fetching Stock Data

```javascript
const fetchData = async (ticker) => {
  setLoading(true);
  setError(null);

  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${STOCK_API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Unable to fetch");
    }

    const data = await res.json();
    console.log(data);

    if (!Object.keys(data["Global Quote"]).length) {
      setError("Ticker can't be found!");
      return;
    } else {
      setStockData(data["Global Quote"]);
    }
  } catch {
    setError("Fetching failed, try again!");
  } finally {
    setLoading(false);
  }
};
```
# Key Learnings
## State mangement
The proper way to manage states should be done in the parent component. In this project I had to duplicate the code for fetching data and storing onto another state. A more appropriate solution is to lift the state via the parent. 

## Naming conventions
There was alot of confusion as I was naming functions and variables and spent alot of time trying to figure out what they are and what they do. 

## Shaping data structures
When fetching data from api and saving them onto local states, there was alot of troubleshooting done as the data received wasn't saving or there was errors. I need to define the shape early in the brainstorming stage and make them consistent across the codes.

# Planning future enhancements 
To include a live streaming video feed 
RSS feeds which updates trending news
Integrate twitter feed from personal account

# Why this app 
As a avid trader, on my workstation I find myself constantly opening multiple tabs programs and having to switch between the screens a hassle. I develop this app in order to have an all-in-one solution and focus on tasks that matters.

---

Enjoy tracking your stock portfolio! 📈

<!-- Polygon.io
api key yAm5b5RvOHugGYVfPI9LeNQBeOTDRBWW

https://www.alphavantage.co/documentation/

https://www.alphavantage.co/#about

api key: U3C581VINP17X9OQ

marketaux (financial news) -
0IqXjtXDF4XuAKsC15buTITFvyIUl7t9xsfz5li7


AirTable Token -

patqMT4WwLRxsfI4p.c399d275bc39e10988d4ce28e6dbbd188be964c2893d5a7a8acd7cf077476b14

MongoDB -
higot0lano -->
