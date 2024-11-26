import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ShopList from '../components/ShopList';
import MapView from '../components/MapView';
import ViewToggle from '../components/ViewToggle';
import { searchShops } from '../api/api';
import { Shop } from '../types/shop';
import styles from './Home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [view, setView] = useState<'map' | 'list'>('list');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const handleSearchClick = async (query: string) => {
    try {
      setIsSearching(true);
      const response = await searchShops(query);
      if (response.data) {
        setShops(response.data);
        setHasSearched(true);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

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
                onSearch={handleSearchClick}
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
              onSearch={handleSearchClick}
              isSearching={isSearching}
            />
          </div>
          <div className={styles.viewControls}>
            <ViewToggle view={view} onViewChange={setView} />
          </div>
          <div className={styles.results}>
            {view === 'list' ? (
              <ShopList shops={shops} />
            ) : (
              <MapView
                shops={shops}
                selectedShop={selectedShop}
                onShopSelect={setSelectedShop}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;