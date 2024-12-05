import axios from 'axios';
import { ApiResponse, Shop } from '../types/shop';
import { searchLocation, searchNearbyShops, getPlaceById } from '../services/mapboxService';

const API_URL = import.meta.env.VITE_API_URL;

export const searchShops = async (query: string): Promise<ApiResponse<Shop[]>> => {
  try {
    // First, get the location coordinates from Mapbox
    const locations = await searchLocation(query);
    if (locations.length > 0) {
      const location = locations[0];
      
      // Search for coffee shops near the selected location
      const shops = await searchNearbyShops(location.center);
      return { data: shops };
    }
    return { data: [] };
  } catch (error) {
    console.error('Error searching shops:', error);
    throw new Error('Failed to fetch shops');
  }
};

export const getShops = async (): Promise<ApiResponse<Shop[]>> => {
  // Default to Kansas City coordinates if no location is specified
  const kansasCityCoords: [number, number] = [-94.5786, 39.0997];
  const shops = await searchNearbyShops(kansasCityCoords);
  return { data: shops };
};

export const getShopById = async (id: string): Promise<ApiResponse<Shop>> => {
  try {
    const shop = await getPlaceById(id);
    if (!shop) {
      throw new Error('Shop not found');
    }
    return { data: shop };
  } catch (error) {
    console.error('Error getting shop by ID:', error);
    throw new Error('Failed to fetch shop details');
  }
};

// Mock favorites functionality with localStorage
const FAVORITES_KEY = 'coffee_shop_favorites';

const getFavoriteIds = (): Set<string> => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return new Set(stored ? JSON.parse(stored) : []);
};

const saveFavoriteIds = (ids: Set<string>) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(ids)));
};

export const addToFavorites = async (id: string): Promise<void> => {
  const favorites = getFavoriteIds();
  favorites.add(id);
  saveFavoriteIds(favorites);
};

export const removeFromFavorites = async (id: string): Promise<void> => {
  const favorites = getFavoriteIds();
  favorites.delete(id);
  saveFavoriteIds(favorites);
};

export const getFavorites = async (): Promise<ApiResponse<Shop[]>> => {
  const favorites = getFavoriteIds();
  const favoriteShops: Shop[] = [];
  
  for (const id of favorites) {
    try {
      const { data: shop } = await getShopById(id);
      favoriteShops.push(shop);
    } catch (error) {
      console.error(`Failed to fetch favorite shop ${id}:`, error);
    }
  }
  
  return { data: favoriteShops };
};

export const isFavorite = async (id: string): Promise<boolean> => {
  const favorites = getFavoriteIds();
  return favorites.has(id);
};