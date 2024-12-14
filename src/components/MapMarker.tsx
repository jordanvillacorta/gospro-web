import React from 'react';
import { Coffee } from 'lucide-react';
import { Shop } from '../types/shop';
import styles from './MapView.module.css';

interface MapMarkerProps {
  shop: Shop;
  isSelected: boolean;
  onClick: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ shop, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.marker} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <Coffee size={24} />
    </div>
  );
};

export default MapMarker;