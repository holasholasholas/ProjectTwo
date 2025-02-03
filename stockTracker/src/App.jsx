import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router";

import "./App.css";
import SingleTick from "../components/SingleTick";
import HomePage from "../pages/homePage";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import ProfitLossCal from "../components/ProfitLossCal";
import Watchlist from "../components/WatchList";


function App() {
  
  const [watchlist, setWatchlist] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  
  const addToWatchlist = (stock) => {
    const isAlreadyInWatchlist = watchlist.some(
      (item) => item.symbol === stock.symbol
    );
    if (!isAlreadyInWatchlist) {
      setWatchlist([...watchlist, stock]);
      setIsSidebarVisible(true);
    } else {
      alert("This stock is already in your watchlist.");
    }
  };

  
  const removeFromWatchlist = (index) => {
    const updatedWatchlist = watchlist.filter((_, i) => i !== index);
    setWatchlist(updatedWatchlist);
  };

  return (
    <>
      <Router>
    <NavBar />
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<ProfitLossCal/>}/>
          <Route
            path="/search"
            element={
              <SingleTick
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                isSidebarVisible={isSidebarVisible}
                setIsSidebarVisible={setIsSidebarVisible}
                addToWatchlist={addToWatchlist}
              />
            }
          />
        </Routes>
        
        {/*<Route path="/watchlist" element={<Watchlist/>}></Route> */}


        <Sidebar
          watchlist={watchlist}
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
          removeFromWatchlist={removeFromWatchlist}
        />
      </Router>
    </>
  );
}

export default App;
