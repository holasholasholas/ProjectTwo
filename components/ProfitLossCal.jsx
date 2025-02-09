import { useState } from "react";
import "../src/ProfitLossCal.css";


const STOCK_API_KEY = `${import.meta.env.VITE_ALPHA_VANTAGE_APIKEY}`;

const ProfitLossCal = () => {
  const [stockDataForCal, setStockDataForCal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]); // Add state for storing results
  const [formData, setFormData] = useState({
    ticker: "",
    buyPrice: "",
    quantity: "",
  });

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${formData.ticker}&apikey=${STOCK_API_KEY}`
      );

      if (!res.ok) {
        throw new Error("Unable to fetch");
      }

      const data = await res.json();
      console.log(data);

      if (!Object.keys(data["Global Quote"]).length) {
        setError("Ticker can't be found, try again!");
        return;
      } else {
        setStockDataForCal(data["Global Quote"]);
        return data["Global Quote"]; // Return the data for immediate use
      }
    } catch {
      setError("Fetching failed, try again!");
    } finally {
      setLoading(false);
    }
  }

  const calculatePnl = async (e) => {
    e.preventDefault();

    if (!formData.ticker || !formData.buyPrice || !formData.quantity) {
      alert("Please fill in all fields!");
      return;
    }

    const stockData = await fetchData();

    console.log(stockData);

    if (stockData) {
      const newStock = {
        symbol: stockData["01. symbol"],
        currentPrice: stockData["05. price"],
      };

      const pnl =
        (newStock.currentPrice - formData.buyPrice) * formData.quantity;

      const result = {
        symbol: newStock.symbol,
        buyPrice: formData.buyPrice,
        currentPrice: parseFloat(newStock.currentPrice),
        quantity: formData.quantity,
        pnl: pnl.toFixed(2),
      };

      console.log(result);

      setResults((prevResults) => [...prevResults, result]);

      // reset form after submit
      setFormData({
        ticker: "",
        buyPrice: "",
        quantity: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h1>Profit Loss Tracker</h1>

      {error ? (
        <p>{error}</p>
      ) : (
        <p>Enter your position details and calculate your P&L</p>
      )}

      {loading && <div>Loading...</div>}

      <form onSubmit={calculatePnl}>
        <input
          type="text"
          name="ticker"
          value={formData.ticker}
          onChange={handleInputChange}
          placeholder="Enter Ticker"
        />
        <input
          type="number"
          name="buyPrice"
          value={formData.buyPrice}
          onChange={handleInputChange}
          placeholder="Buy Price"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <button type="submit" disabled={loading}>
          Calculate
        </button>
      </form>

      <div>
        <h2>Results:</h2>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Buy Price</th>
              <th>Current Price</th>
              <th>Quantity</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.symbol}</td>
                <td>${result.buyPrice}</td>
                <td>${result.currentPrice}</td>
                <td>{result.quantity}</td>
                <td className={result.pnl > 0 ? "profit" : "loss"}>
                  ${result.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfitLossCal;
