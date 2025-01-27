import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router';

import './App.css'
import SingleTick from '../components/singleTick';

function App() {
  

  return (
    <>
    test
    <Router>
      <Routes>
        {/* <Route path="/main" element={<HomePage />}  /> */}
        <Route path="/search" element={<SingleTick />} />
        {/* <Route path="/watchlist" element={<Watchlist />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App
