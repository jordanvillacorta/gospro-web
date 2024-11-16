import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShopDetail from './components/ShopDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;