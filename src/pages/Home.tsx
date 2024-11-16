import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import { searchShops } from '../api/api';
import styles from './Home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = async (query: string) => {
    try {
      setIsSearching(true);
      const response = await searchShops(query);
      
      if (response.data && response.data.length > 0) {
        // For now, navigate to the first shop found
        navigate(`/shop/${response.data[0].id}`);
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
    </div>
  );
};

export default Home;