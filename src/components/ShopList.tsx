import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, ArrowLeft } from 'lucide-react';
import { Shop } from '../services/mapboxService';
import styles from './ShopList.module.css';

interface ShopListProps {
  shops: Shop[];
  selectedShopId?: string;
  onShopSelect: (shop: Shop | null) => void;
  onClearSelection: () => void;
  showBackButton: boolean;
  insights?: Array<{
    name: string;
    rank: number;
    explanation: string;
  }>;
}

const ShopList: React.FC<ShopListProps> = ({ 
  shops = [], 
  selectedShopId, 
  onShopSelect,
  onClearSelection,
  showBackButton,
  insights
}) => {
  const handleShopClick = (shop: Shop) => {
    if (onShopSelect) {
      onShopSelect(shop);
    }
  };

  const getShopInsight = (shopName: string) => {
    return insights?.find(insight => insight.name === shopName);
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
      {shops.map((shop) => {
        const shopInsight = getShopInsight(shop.name);
        
        return (
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
                <div className={styles.headerSection}>
                  <h3 className={styles.name}>{shop.name}</h3>
                  {shopInsight && (
                    <div className={styles.rankBadge}>
                      <Sparkles size={14} />
                      <span>Rank #{shopInsight.rank}</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.location}>
                  <MapPin size={16} />
                  <span>{shop.address}, {shop.city}, {shop.state}</span>
                </div>

                <p className={styles.description}>{shop.description}</p>
                
                {shopInsight && (
                  <div className={styles.insightContainer}>
                    <p className={styles.insight}>{shopInsight.explanation}</p>
                  </div>
                )}
              </div>
            </div>
            <Link 
              to={`/shop/${shop.id}`} 
              className={styles.detailsLink}
            >
              View Details
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ShopList;