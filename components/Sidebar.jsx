import React from "react";
import "../src/Sidebar.css";

const Sidebar = ({ watchlist, isVisible, onClose, removeFromWatchlist }) => {
  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <button onClick={onClose} className="close-button">test</button>
      <h3>Watchlist</h3>
      <ul>
        {watchlist.map((stock, index) => (
          <li key={index}>
            <span>{stock.symbol}</span>
            <span>${Math.round((stock.price * 100) /100)}</span>
            <span>{stock.changePercent}</span>
            {/* to fix decimal places */}
            <button onClick={() => removeFromWatchlist(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
