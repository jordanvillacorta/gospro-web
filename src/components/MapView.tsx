import React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import { Shop } from '../types/shop';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapView.module.css';

interface MapViewProps {
  shops: Shop[];
  selectedShop: Shop | null;
  onShopSelect: (shop: Shop | null) => void;
}

const MapView: React.FC<MapViewProps> = ({ shops, selectedShop, onShopSelect }) => {
  // Filter shops that have valid coordinates
  const shopsWithCoordinates = shops.filter(
    shop => shop.coordinates?.latitude && shop.coordinates?.longitude
  );

  // Calculate center based on available shops or default to Kansas City
  const center = shopsWithCoordinates.length > 0
    ? {
      longitude: shopsWithCoordinates.reduce((sum, shop) => sum + shop.coordinates.longitude, 0) / shopsWithCoordinates.length,
      latitude: shopsWithCoordinates.reduce((sum, shop) => sum + shop.coordinates.latitude, 0) / shopsWithCoordinates.length,
    }
    : { longitude: -94.5786, latitude: 39.0997 }; // Kansas City coordinates

  return (
    <div className={styles.mapContainer}>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          ...center,
          zoom: 12
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        reuseMaps
      >
        {shopsWithCoordinates.map((shop) => (
          <Marker
            key={shop.id}
            longitude={shop.coordinates.longitude}
            latitude={shop.coordinates.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onShopSelect(shop);
            }}
          >
            <MapPin
              className={`${styles.marker} ${selectedShop?.id === shop.id ? styles.selected : ''}`}
              size={32}
            />
          </Marker>
        ))}

        {selectedShop?.coordinates && (
          <Popup
            longitude={selectedShop.coordinates.longitude}
            latitude={selectedShop.coordinates.latitude}
            anchor="bottom"
            onClose={() => onShopSelect(null)}
            className={styles.popup}
          >
            <div className={styles.popupContent}>
              <h3>{selectedShop.name}</h3>
              <p>{selectedShop.address}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapView;