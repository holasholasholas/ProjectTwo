import React from 'react'
import '../src/watchList.css';

const Watchlist = ({ watchlist, removeFromWatchlist }) => {
    return (
      <div>
        <h2>Watchlist</h2>
        {watchlist.length > 0 ? (
          <ul>
            {watchlist.map((stock, index) => (
              <li key={index} className="stock-item">
                <span>{stock.symbol}</span>
                <span>${stock.price}</span>
                <span>{stock.changePercent}</span>
                <button onClick={() => removeFromWatchlist(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    );
  };
  
  export default Watchlist;