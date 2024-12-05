import { useState, useCallback } from 'react';
import { searchLocation, searchNearbyShops, MapboxLocation } from '../services/mapboxService';
import { Shop } from '../types/shop';

export const useMapSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MapboxLocation | null>(null);

  const handleSearch = useCallback(async (query: string): Promise<Shop[]> => {
    setIsSearching(true);
    try {
      // First, get the location coordinates from Mapbox
      const locations = await searchLocation(query);
      if (locations.length > 0) {
        const location = locations[0];
        setSelectedLocation(location);
        
        // Search for coffee shops near the selected location
        const shops = await searchNearbyShops(location.center);
        return shops;
      }
      return [];
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  return {
    isSearching,
    selectedLocation,
    handleSearch
  };
};