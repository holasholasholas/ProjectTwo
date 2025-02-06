import { Link } from "react-router-dom";
import "../src/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h3 className="navbar-title">StockTracker</h3>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/calculator" className="navbar-link">
              P&L Tracker
            </Link>
          </li>
          <li>
            <Link to="/search" className="navbar-link">
              Stock Search
            </Link>
            </li>
            <li>
            <Link to="/watchlist" className="navbar-link">Watchlist</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
