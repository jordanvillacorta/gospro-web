import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ShopList from '../components/ShopList';
import MapView from '../components/MapView';
import { useSearch } from '../hooks/useSearch';
import { Shop } from '../types/shop';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {
    searchTerm,
    setSearchTerm,
    hasSearched,
    isSearching,
    searchResults,
    handleSearchSubmit,
    setSearchResults
  } = useSearch();
  
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const navigate = useNavigate();

  const handleShopSelect = (shop: Shop | null) => {
    setSelectedShop(shop);
  };

  const handleShopsUpdate = (newShops: Shop[]) => {
    setSearchResults(newShops);
  };

  const handleViewAllShops = () => {
    navigate('/shoplist', { state: { shops: searchResults } });
  };

  const displayedShops = selectedShop ? [selectedShop] : searchResults;

  return (
    <div className={styles.container}>
      {!hasSearched ? (
        <main className={styles.main}>
          <div className={styles.backgroundImage} />
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <div className={styles.titleContainer}>
                <Rocket className="h-12 w-12" />
                <h1 className={styles.title}>STARBREW CREW</h1>
              </div>
              
              <h2 className={styles.subtitle}>
                Find Local Craft Coffee Near You
              </h2>
              
              <SearchBar 
                value={searchTerm} 
                onChange={setSearchTerm} 
                onSearch={handleSearchSubmit}
                isSearching={isSearching}
              />
              
              <p className={styles.tagline}>
                some espresso for my depresso
              </p>
            </div>
          </div>
        </main>
      ) : (
        <div className={styles.resultsContainer}>
          <div className={styles.searchHeader}>
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              onSearch={handleSearchSubmit}
              isSearching={isSearching}
            />
          </div>
          <div className={styles.resultsContent}>
            <div className={styles.mapSection}>
              <MapView 
                shops={searchResults}
                selectedShop={selectedShop}
                onShopSelect={handleShopSelect}
                onShopsUpdate={handleShopsUpdate}
              />
            </div>
            <div className={styles.listSection}>
              <ShopList 
                shops={displayedShops}
                selectedShopId={selectedShop?.id}
                onShopSelect={handleShopSelect}
                onClearSelection={() => setSelectedShop(null)}
                showBackButton={!!selectedShop}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;