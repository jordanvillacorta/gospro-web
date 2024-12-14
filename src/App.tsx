import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializePlatform } from './services/platform';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ShopDetail from './components/ShopDetail';

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
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;