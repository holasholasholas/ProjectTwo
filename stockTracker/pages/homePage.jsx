import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Stock Checker</h1>
      <nav>
        <ul>
          <li>
            <Link to="/search">Single Ticker</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;