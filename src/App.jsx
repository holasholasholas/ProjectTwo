import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router";

import "./App.css";
import SingleTick from "../components/SingleTick";
import HomePage from "../pages/homePage";
import NavBar from "../components/NavBar";
import ProfitLossCal from "../components/ProfitLossCal";
import Watchlist from "../components/WatchList";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [savedStocks, setSavedStocks] = useState([]);
  
  const [realWatchlist, setRealWatchlist] = useState({});

  const liftState = (data) => {
    setRealWatchlist(data);
  };

  const addToWatchlist = (stock) => {
    const isAlreadyInWatchlist = watchlist.some(  // Check if the stock is already in the watchlist
      (item) => item.symbol === stock.symbol
    );
    if (!isAlreadyInWatchlist) {
      setWatchlist([...watchlist, stock]);
    } else {
      alert("This stock is already in your watchlist.");
    }
  };

  const removeFromWatchlist = (index) => {
    const updatedWatchlist = watchlist.filter((element, i) => i !== index);
    setWatchlist(updatedWatchlist);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/calculator"
            watchlist={watchlist}
            element={<ProfitLossCal />}
          />
          <Route
            path="/search"
            element={
              <SingleTick
                watchlist={watchlist}
                savedStocks={savedStocks} 
                setSavedStocks={setSavedStocks}
                setWatchlist={setWatchlist}
                addToWatchlist={addToWatchlist}
                liftState={liftState}
              />
            }
          />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} savedStocks={savedStocks} setSavedStocks={setSavedStocks} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
