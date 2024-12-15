import { useState, useCallback, useEffect, useRef } from 'react';
import { ViewState } from 'react-map-gl';
import { searchNearbyShops } from '../services/mapboxService';

export const useMapInteraction = () => {
  const [mapMoved, setMapMoved] = useState(false);
  const [isSearchingArea, setIsSearchingArea] = useState(false);
  const [lastPosition, setLastPosition] = useState<{longitude: number, latitude: number} | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMapMove = useCallback((evt: { viewState: ViewState }) => {
    const { viewState } = evt;
    
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setMapMoved(false);

    timeoutRef.current = window.setTimeout(() => {
      if (viewState.longitude && viewState.latitude) {
        if (!lastPosition) {
          setLastPosition({ longitude: viewState.longitude, latitude: viewState.latitude });
          setMapMoved(true);
          return;
        }

        const distanceMoved = Math.abs(lastPosition.longitude - viewState.longitude) +
                           Math.abs(lastPosition.latitude - viewState.latitude);
        
        if (distanceMoved > 0.01) {
          setLastPosition({ longitude: viewState.longitude, latitude: viewState.latitude });
          setMapMoved(true);
        }
      }
    }, 500);
  }, [lastPosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearchArea = useCallback(async (viewport: ViewState, shouldUpdateMap: boolean = false) => {
    if (!viewport.longitude || !viewport.latitude) return [];
    
    setIsSearchingArea(true);
    try {
      const shops = await searchNearbyShops([viewport.longitude, viewport.latitude]);
      return { shops, shouldUpdateMap };
    } catch (error) {
      console.error('Error searching area:', error);
      return { shops: [], shouldUpdateMap };
    } finally {
      setIsSearchingArea(false);
    }
  }, []);

  return {
    mapMoved,
    isSearchingArea,
    handleMapMove,
    handleSearchArea
  };
};