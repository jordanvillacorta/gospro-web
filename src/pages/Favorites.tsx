import React, { useState, useEffect } from 'react';
import { getFavorites } from '../api/api';
import ShopList from '../components/ShopList';
import { Loader } from 'lucide-react';
import { Shop } from '../types/shop';
import styles from './Favorites.module.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await getFavorites();
        setFavorites(response.data);
      } catch (err) {
        setError('Failed to load favorites. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Favorite Coffee Shops</h1>
      </div>
      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>You haven't added any coffee shops to your favorites yet.</p>
        </div>
      ) : (
        <ShopList shops={favorites} />
      )}
    </div>
  );
};

export default Favorites;