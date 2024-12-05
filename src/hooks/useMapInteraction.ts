import { useState, useCallback } from 'react';
import { ViewState } from 'react-map-gl';
import { searchNearbyShops } from '../services/mapboxService';
import { Shop } from '../types/shop';

export const useMapInteraction = () => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({});
  const [mapMoved, setMapMoved] = useState(false);
  const [isSearchingArea, setIsSearchingArea] = useState(false);

  const handleMapMove = useCallback(({ viewState }: { viewState: ViewState }) => {
    setViewState(viewState);
    setMapMoved(true);
  }, []);

  const handleSearchArea = useCallback(async () => {
    if (!viewState.longitude || !viewState.latitude) return [];
    
    setIsSearchingArea(true);
    try {
      const shops = await searchNearbyShops([viewState.longitude, viewState.latitude]);
      setMapMoved(false);
      return shops;
    } catch (error) {
      console.error('Error searching area:', error);
      return [];
    } finally {
      setIsSearchingArea(false);
    }
  }, [viewState]);

  const resetMapMoved = useCallback(() => {
    setMapMoved(false);
  }, []);

  return {
    viewState,
    mapMoved,
    isSearchingArea,
    handleMapMove,
    handleSearchArea,
    resetMapMoved
  };
};