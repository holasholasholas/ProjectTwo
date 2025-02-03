import { useState } from "react";
import FetchNews from "./FetchNews";

const SingleTick = ({
  addToWatchlist
  
}) => {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=U3C581VINP17X9OQ`
      );

      if (!res.ok) {
        throw new Error("Unable to fetch");
      }

      const data = await res.json();

      if (data["Global Quote"]) {
        setStockData(data["Global Quote"]);
      } else {
        throw new Error("Invalid request");
      }
    } catch {
      setError("Fetching failed, try again!");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) {
      fetchData();
    }
  };

  const handleAddToWatchlist = () => {
    if (stockData) {
      const newStock = {
        symbol: stockData["01. symbol"],
        price: stockData["05. price"],
        changePercent: stockData["10. change percent"],
      };
      addToWatchlist(newStock);
    }
  };

  return (
    <div>
      <h1>Stock Info</h1>
      <form onSubmit={handleSubmit} className="searchTicker">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter ticker symbol"
        />
        <button type="submit">{loading ? "Loading..." : "Search"}</button>
      </form>

      {error && <p>{error}</p>}

      {stockData && (
        <div>
          <p>Symbol: {stockData["01. symbol"]}</p>
          <p>Price: ${stockData["05. price"]}</p>
          <p>Open: {stockData["02. open"]}</p>
          <p>Change: {stockData["09. change"]}</p>
          <p>Previous Close: {stockData["08. previous close"]}</p>
          <p>Change Percent:{stockData["10. change percent"]} </p>
          <p>High: {stockData["03. high"]} </p>
          <p>Low: {stockData["04. low"]}</p>
          <p>Volume: {stockData["06. volume"]}</p>
          <p>Last Trading Day: {stockData["07. latest trading day"]}</p>
          <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
          <FetchNews ticker={ticker} />
        </div>
      )}
    </div>
  );
};

export default SingleTick;
