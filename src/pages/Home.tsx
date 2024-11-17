import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import ShopList from '../components/ShopList';
import { searchShops } from '../api/api';
import { Shop } from '../types/shop';
import styles from './Home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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
      <Navbar />
      {!hasSearched ? (
        <main className={styles.main}>
          <div className={styles.backgroundImage} />
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <div className={styles.titleContainer}>
                <Coffee className="h-12 w-12" />
                <h1 className={styles.title}>GO'SPRO</h1>
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
          <ShopList shops={shops} />
        </div>
      )}
    </div>
  );
};

export default Home;