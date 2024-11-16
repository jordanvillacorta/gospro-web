import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import { Coffee } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.backgroundImage} />
        
        <div className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.titleContainer}>
              <Coffee className="h-12 w-12" />
              <h1 className={styles.title}>
                GO'SPRO
              </h1>
            </div>
            
            <h2 className={styles.subtitle}>
              Find Local Craft Coffee Near You
            </h2>
            
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              onSearch={handleSearchClick}
            />
            
            <p className={styles.tagline}>
              some espresso for my depresso
            </p>
          </div>

          <div className={styles.decorativeGradient} />
        </div>
      </main>
    </div>
  );
};

export default Home;