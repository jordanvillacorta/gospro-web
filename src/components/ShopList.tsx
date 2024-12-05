import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Shop } from '../types/shop';
import styles from './ShopList.module.css';

interface ShopListProps {
  shops: Shop[];
  selectedShopId?: string;
  onShopSelect?: (shop: Shop) => void;
  onClearSelection?: () => void;
  showBackButton?: boolean;
}

const ShopList: React.FC<ShopListProps> = ({ 
  shops = [], 
  selectedShopId, 
  onShopSelect,
  onClearSelection,
  showBackButton 
}) => {
  const handleShopClick = (shop: Shop) => {
    if (onShopSelect) {
      onShopSelect(shop);
    }
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
      {showBackButton && (
        <button 
          className={styles.backButton}
          onClick={onClearSelection}
        >
          <ArrowLeft size={20} />
          <span>Back to all shops</span>
        </button>
      )}
      {shops.map((shop) => (
        <div
          key={shop.id}
          className={`${styles.shopCard} ${selectedShopId === shop.id ? styles.selected : ''}`}
        >
          <div 
            className={styles.cardContent}
            onClick={() => handleShopClick(shop)}
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
            </div>
          </div>
          <Link 
            to={`/shop/${shop.id}`} 
            className={styles.detailsLink}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShopList;