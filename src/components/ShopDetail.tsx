import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Clock, Phone, Globe, Mail, Coffee, MapPin, Loader } from 'lucide-react';
import { getShopById, addToFavorites, removeFromFavorites, isFavorite } from '../api/api';
import { Shop } from '../types/shop';
import styles from './ShopDetail.module.css';

const ShopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getShopById(id!);
        setShop(response.data);
        const favoriteStatus = await isFavorite(id!);
        setIsFavorited(favoriteStatus);
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

  const handleFavoriteToggle = async () => {
    if (!id) return;
    
    try {
      setIsFavoriting(true);
      if (isFavorited) {
        await removeFromFavorites(id);
      } else {
        await addToFavorites(id);
      }
      setIsFavorited(!isFavorited);
    } catch (err) {
      setError('Failed to update favorites. Please try again.');
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
          src={shop.photos[0]} 
          alt={shop.name}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.name}>{shop.name}</h1>
          <p className={styles.address}>
            <MapPin className="inline-block mr-2" size={16} />
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
                <div key={day} className={styles.hourRow}>
                  <span className={styles.day}>{day}</span>
                  <span className={styles.time}>
                    <Clock size={16} className="inline-block mr-2" />
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            {shop.contact.phone && (
              <div className={styles.contactItem}>
                <Phone size={18} />
                <span>{shop.contact.phone}</span>
              </div>
            )}
            {shop.contact.website && (
              <div className={styles.contactItem}>
                <Globe size={18} />
                <a href={shop.contact.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </div>
            )}
            {shop.contact.email && (
              <div className={styles.contactItem}>
                <Mail size={18} />
                <a href={`mailto:${shop.contact.email}`}>{shop.contact.email}</a>
              </div>
            )}
          </div>

          <button 
            className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ''}`}
            onClick={handleFavoriteToggle}
            disabled={isFavoriting}
          >
            <Heart className={isFavorited ? 'fill-current' : ''} size={20} />
            {isFavoriting 
              ? 'Updating...' 
              : isFavorited 
                ? 'Remove from Favorites' 
                : 'Add to Favorites'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;