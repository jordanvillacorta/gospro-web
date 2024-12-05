import React, { useEffect, useCallback, useRef } from 'react';
import Map, { Marker, Popup, ViewState } from 'react-map-gl';
import { MapPin, Navigation } from 'lucide-react';
import { Shop } from '../types/shop';
import { getBoundingBox } from '../services/mapboxService';
import { getDirectionsUrl } from '../utils/navigation';
import { useMapInteraction } from '../hooks/useMapInteraction';
import MapMarker from './MapMarker';
import SearchAreaButton from './SearchAreaButton';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapView.module.css';

interface MapViewProps {
  shops: Shop[];
  selectedShop: Shop | null;
  onShopSelect: (shop: Shop | null) => void;
  onShopsUpdate?: (shops: Shop[]) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  shops = [], 
  selectedShop, 
  onShopSelect,
  onShopsUpdate 
}) => {
  const mapRef = useRef<any>(null);
  const {
    viewState,
    mapMoved,
    isSearchingArea,
    handleMapMove,
    handleSearchArea,
    resetMapMoved
  } = useMapInteraction();

  const shopsWithCoordinates = shops.filter(
    shop => shop.coordinates?.latitude && shop.coordinates?.longitude
  );

  const coordinates: [number, number][] = shopsWithCoordinates.map(shop => [
    shop.coordinates.longitude,
    shop.coordinates.latitude
  ]);

  const defaultViewport = {
    longitude: -94.5786,
    latitude: 39.0997,
    zoom: 12
  };

  const bounds = coordinates.length > 0 ? getBoundingBox(coordinates) : null;

  const handleGetDirections = (shop: Shop) => {
    const fullAddress = `${shop.name}, ${shop.address}, ${shop.city}, ${shop.state}`;
    window.open(getDirectionsUrl(fullAddress), '_blank');
  };

  const handleSearchThisArea = async () => {
    const newShops = await handleSearchArea();
    if (onShopsUpdate) {
      onShopsUpdate(newShops);
    }
  };

  const focusOnShop = useCallback((shop: Shop) => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [shop.coordinates.longitude, shop.coordinates.latitude],
      zoom: 15,
      duration: 1000,
      essential: true
    });
    resetMapMoved();
  }, [resetMapMoved]);

  useEffect(() => {
    if (selectedShop) {
      focusOnShop(selectedShop);
    }
  }, [selectedShop, focusOnShop]);

  return (
    <div className={styles.mapContainer}>
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={defaultViewport}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        bounds={bounds}
        onMove={handleMapMove}
        reuseMaps
      >
        {shopsWithCoordinates.map((shop) => (
          <Marker
            key={shop.id}
            longitude={shop.coordinates.longitude}
            latitude={shop.coordinates.latitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onShopSelect(shop);
            }}
          >
            <MapMarker 
              shop={shop}
              isSelected={selectedShop?.id === shop.id}
              onClick={() => onShopSelect(shop)}
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
            closeButton={true}
            closeOnClick={false}
          >
            <div className={styles.popupContent}>
              <h3>{selectedShop.name}</h3>
              <p>{selectedShop.address}</p>
              <button
                className={styles.directionsButton}
                onClick={() => handleGetDirections(selectedShop)}
              >
                <Navigation size={16} />
                <span>Get Directions</span>
              </button>
            </div>
          </Popup>
        )}

        {mapMoved && (
          <SearchAreaButton 
            onClick={handleSearchThisArea}
            isSearching={isSearchingArea}
          />
        )}
      </Map>
    </div>
  );
};

export default MapView;