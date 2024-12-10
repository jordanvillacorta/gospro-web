import { useState, useCallback } from 'react';
import { ViewState } from 'react-map-gl';
import { searchNearbyShops } from '../services/mapboxService';
import { Shop } from '../types/shop';

export const useMapInteraction = () => {
  const [mapMoved, setMapMoved] = useState(false);
  const [isSearchingArea, setIsSearchingArea] = useState(false);

  const handleMapMove = useCallback((evt: { viewState: ViewState }) => {
    const { viewState } = evt;
    if (viewState.longitude && viewState.latitude) {
      setMapMoved(true);
    }
  }, []);

  const handleSearchArea = useCallback(async (viewport: ViewState) => {
    if (!viewport.longitude || !viewport.latitude) return [];
    
    setIsSearchingArea(true);
    try {
      const shops = await searchNearbyShops([viewport.longitude, viewport.latitude]);
      setMapMoved(false);
      return shops;
    } catch (error) {
      console.error('Error searching area:', error);
      return [];
    } finally {
      setIsSearchingArea(false);
    }
  }, []);

  const resetMapMoved = useCallback(() => {
    setMapMoved(false);
  }, []);

  return {
    mapMoved,
    isSearchingArea,
    handleMapMove,
    handleSearchArea,
    resetMapMoved
  };
};