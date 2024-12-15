import React, { useEffect, useCallback, useRef, useState } from 'react';
import Map, { Marker, Popup, ViewState } from 'react-map-gl';
import { ArrowBigLeft, Navigation } from 'lucide-react';
import { Shop } from '../types/shop';
import { getBoundingBox } from '../services/mapboxService';
import { getDirectionsUrl } from '../utils/navigation';
import { useMapInteraction } from '../hooks/useMapInteraction';
import MapMarker from './MapMarker';
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
  const [viewport, setViewport] = useState({
    longitude: -94.5786,
    latitude: 39.0997,
    zoom: 13
  });

  const {
    mapMoved,
    isSearchingArea,
    handleMapMove,
    handleSearchArea,
  } = useMapInteraction();

  const shopsWithCoordinates = shops.filter(
    shop => shop.coordinates?.latitude && shop.coordinates?.longitude
  );

  const coordinates: [number, number][] = shopsWithCoordinates.map(shop => [
    shop.coordinates.longitude,
    shop.coordinates.latitude
  ]);

  const handleGetDirections = (shop: Shop) => {
    const fullAddress = `${shop.name}, ${shop.address}, ${shop.city}, ${shop.state}`;
    window.open(getDirectionsUrl(fullAddress), '_blank');
  };

  const handleSearchThisAreaAndUpdate = async () => {
    const { shops: newShops } = await handleSearchArea(viewport, false);
    if (onShopsUpdate) {
      onShopsUpdate(newShops);
    }
  };

  useEffect(() => {
    if (shops.length > 0 && !mapRef.current) {
      const firstShop = shops[0];
      if (firstShop.coordinates) {
        const newViewport = {
          longitude: firstShop.coordinates.longitude,
          latitude: firstShop.coordinates.latitude,
          zoom: 11
        };

        setViewport(newViewport);
      }
    }
  }, [shops]);

  const focusOnShop = useCallback((shop: Shop) => {
    if (!mapRef.current) return;

    const newViewport = {
      longitude: shop.coordinates.longitude,
      latitude: shop.coordinates.latitude,
      zoom: 15
    };

    setViewport(newViewport);
    mapRef.current.flyTo({
      center: [shop.coordinates.longitude, shop.coordinates.latitude],
      zoom: 15,
      duration: 1000,
      essential: true
    });
  }, []);

  const handleBackToResults = useCallback(() => {
    if (!mapRef.current) return;

    const newViewport = {
      ...viewport,
      zoom: 11  // Zoom out to a level that shows the search area
    };

    setViewport(newViewport);
    mapRef.current.flyTo({
      center: [viewport.longitude, viewport.latitude],
      zoom: 11,
      duration: 1000,
      essential: true
    });
  }, [viewport]);

  useEffect(() => {
    if (selectedShop?.coordinates) {
      focusOnShop(selectedShop);
    }
  }, [selectedShop, focusOnShop]);

  const handleMapMovement = (evt) => {
    setViewport(evt.viewState);
    handleMapMove(evt);
  };

  const renderSearchAreaButton = () => {
    const shouldShow = mapMoved && !isSearchingArea && !selectedShop;
    
    if (!shouldShow) return null;
    
    return (
      <button 
        className={styles.searchAreaButton}
        onClick={handleSearchThisAreaAndUpdate}
      >
        Search This Area
      </button>
    );
  };

  return (
    <div className={styles.mapContainer}>
      {!selectedShop && viewport.zoom > 11 && (
        <button
          onClick={handleBackToResults}
          className={styles.backButton}
        >
          <ArrowBigLeft />
          Back to search results
        </button>
      )}
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        {...viewport}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onMove={evt => {
          setViewport(evt.viewState);
          handleMapMovement(evt);
        }}
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
      </Map>
      {renderSearchAreaButton()}
    </div>
  );
};

export default MapView;