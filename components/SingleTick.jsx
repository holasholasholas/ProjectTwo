import { useCallback, useState } from "react";
import FetchNews from "./FetchNews";
import ProfitLossCal from "./ProfitLossCal";

const STOCK_API_KEY = `${import.meta.env.VITE_ALPHA_VANTAGE_APIKEY}`;
const AIRTABLE_API_KEY = `${import.meta.env.VITE_AIRTABLE_API_KEY}`;

const SingleTick = ({
  addToWatchlist,
  liftState,
  savedStocks,
  setSavedStocks,
}) => {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  async function fetchAirtable() {
    const url = `https://api.airtable.com/v0/appnbMRdyW6jkWQGB/Table`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      const mapped = json.records.map((record) => record.fields); // this shape different

      //   [
      //     {
      //         "symbol": "TSLA",
      //         "price": "361.6200",
      //         "changePercent": "-3.3928%"
      //     },
      //     {
      //         "symbol": "NVDA",
      //         "price": "129.8400",
      //         "changePercent": "0.9015%"
      //     },
      //     {
      //         "symbol": "AAPL",
      //         "price": "227.6300",
      //         "changePercent": "-2.3969%"
      //     }
      // ]

      //[

      //     {
      //       "id": "rec84WQIFwzqmefCh",
      //       "createdTime": "2025-02-08T08:40:49.000Z",
      //       "fields": Stock
      //   },
      //   {
      //       "id": "recoElHsQOuRdCbaN",
      //       "createdTime": "2025-02-08T08:46:29.000Z",
      //       "fields": stock
      //   },
      //   {
      //       "id": "recoorvynt3Jxwjxi",
      //       "createdTime": "2025-02-08T08:42:55.000Z",
      //       "fields": stock
      //   }
      // ]

      setSavedStocks(mapped);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  const postAirtable = async (data) => {
    const url = `https://api.airtable.com/v0/appnbMRdyW6jkWQGB/Table%201`;
    console.log(data);
    console.log(savedStocks);
    const isSaved = savedStocks.some(
      (stock) => stock.symbol === data.fields.symbol
    );
    if (!isSaved) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return json;
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Ticker is already saved!");
      return null;
    }
  };

  async function fetchData() {
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

      // to check if api returns nothing since missing ticker returns nth from api
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

      const entry = {
        fields: {
          symbol: stockData["01. symbol"],
          price: stockData["05. price"],
          changePercent: stockData["10. change percent"],
        },
      };

      const addedToWatchlist = addToWatchlist(newStock);
      const realData = fetchAirtable();

      liftState(realData);

      if (addedToWatchlist) {
        postAirtable(entry);
      }
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
