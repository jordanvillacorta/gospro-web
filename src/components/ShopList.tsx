import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, DollarSign, Clock } from 'lucide-react';
import { Shop } from '../types/shop';
import styles from './ShopList.module.css';

interface ShopListProps {
  shops: Shop[];
}

const ShopList: React.FC<ShopListProps> = ({ shops }) => {
  const navigate = useNavigate();

  const handleShopClick = (shopId: string) => {
    navigate(`/shop/${shopId}`);
  };

  const renderPriceRange = (range: string) => {
    return range.split('').map((_, i) => (
      <DollarSign
        key={i}
        size={16}
        className={styles.priceIcon}
      />
    ));
  };

  if (!shops.length) {
    return (
      <div className={styles.noResults}>
        <p>No coffee shops found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {shops.map((shop) => (
        <div
          key={shop.id}
          className={styles.shopCard}
          onClick={() => handleShopClick(shop.id)}
        >
          <div className={styles.imageContainer}>
            <img
              src={shop.photos[0]}
              alt={shop.name}
              className={styles.shopImage}
            />
          </div>

          <div className={styles.content}>
            <h3 className={styles.name}>{shop.name}</h3>

            <div className={styles.location}>
              <MapPin size={16} />
              <span>{shop.city}, {shop.state}</span>
            </div>

            <p className={styles.description}>{shop.description}</p>

            <div className={styles.footer}>
              <div className={styles.price}>
                {renderPriceRange(shop.priceRange)}
              </div>

              <div className={styles.hours}>
                <Clock size={16} />
                <span>Opens {shop.hours.Monday.split('-')[0].trim()}</span>
              </div>
            </div>

            <div className={styles.specialties}>
              {shop.specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className={styles.specialty}>
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopList;