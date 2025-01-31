import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router';

import './App.css'
import SingleTick from '../components/SingleTick';
import HomePage from '../pages/homePage';
import FetchNews from '../components/fetchNews';

function App() {
  

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/search" element={<SingleTick />} />
        {/* <Route path="/watchlist" element={<Watchlist />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App
