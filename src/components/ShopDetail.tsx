import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Clock, Phone, Globe, Mail, Coffee, Wifi, CreditCard, MapPin, Loader } from 'lucide-react';
import { getShopById, addToFavorites } from '../api/api';
import { Shop, ApiResponse } from '../types/shop';
import styles from './ShopDetail.module.css';

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavoriting, setIsFavoriting] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: ApiResponse<Shop> = await getShopById(id!);
        setShop(response.data);
      } catch (err) {
        setError('Failed to load coffee shop details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchShop();
    }
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      setIsFavoriting(true);
      await addToFavorites(id!);
      // You might want to update some global state here to reflect the favorite status
    } catch (err) {
      setError('Failed to add to favorites. Please try again.');
    } finally {
      setIsFavoriting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader className={styles.loadingSpinner} size={32} />
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className={styles.error}>
        <h2>Oops!</h2>
        <p>{error || 'Coffee shop not found'}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img 
          src={shop.photos[0] || 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2940'} 
          alt={shop.name}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.name}>{shop.name}</h1>
          <p className={styles.address}>
            {shop.address}, {shop.city}, {shop.state}
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.description}>{shop.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Specialties</h2>
            <div className={styles.specialties}>
              {shop.specialties.map((specialty, index) => (
                <span key={index} className={styles.specialty}>
                  {specialty}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Amenities</h2>
            <div className={styles.amenities}>
              {shop.amenities.map((amenity, index) => (
                <div key={index} className={styles.amenity}>
                  <Coffee size={18} />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.sideInfo}>
          <div className={styles.infoCard}>
            <h3 className={styles.sectionTitle}>Hours</h3>
            <div className={styles.hours}>
              {Object.entries(shop.hours).map(([day, hours]) => (
                <React.Fragment key={day}>
                  <span className={styles.day}>{day}</span>
                  <span>{hours}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            {shop.contact.phone && (
              <div className={styles.amenity}>
                <Phone size={18} />
                <span>{shop.contact.phone}</span>
              </div>
            )}
            {shop.contact.website && (
              <div className={styles.amenity}>
                <Globe size={18} />
                <a href={shop.contact.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </div>
            )}
            {shop.contact.email && (
              <div className={styles.amenity}>
                <Mail size={18} />
                <a href={`mailto:${shop.contact.email}`}>{shop.contact.email}</a>
              </div>
            )}
          </div>

          <button 
            className={styles.favoriteButton}
            onClick={handleAddToFavorites}
            disabled={isFavoriting}
          >
            <Heart size={20} />
            {isFavoriting ? 'Adding to Favorites...' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;