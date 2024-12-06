import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializePlatform } from './services/platform';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShopDetail from './components/ShopDetail';
import Favorites from './pages/Favorites';
import LoginModal from './components/auth/LoginModal';

const App = () => {
  useEffect(() => {
    initializePlatform();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;