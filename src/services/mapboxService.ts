import axios from 'axios';
import { Shop } from '../types/shop';
import FRANCHISES from './franchises.json' assert { type: 'json' };

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MAPBOX_API_URL = 'https://api.mapbox.com';
const MAX_RESULTS = 50;
const SEARCH_RADIUS = 25000; // Increased from 10000 to 25000 meters (25km)

export interface MapboxLocation {
  center: [number, number];
  place_name: string;
  context: Array<{
    id: string;
    text: string;
  }>;
}

export interface MapboxPlace {
  id: string;
  place_name: string;
  center: [number, number];
  properties: {
    name: string;
    address?: string;
    category?: string;
    phone?: string;
  };
  context: Array<{
    id: string;
    text: string;
  }>;
}

const isFranchise = (placeName: string): boolean => {
  const normalizedName = placeName.toLowerCase();
  return FRANCHISES.some(franchise => 
    normalizedName.includes(franchise.toLowerCase())
  );
};

export const searchLocation = async (
  query: string
): Promise<MapboxLocation[]> => {
  try {
    const response = await axios.get(
      `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${MAPBOX_TOKEN}&types=place,locality&limit=50`
    );

    const locations = response.data.features.map((feature: any) => ({
      center: feature.center,
      place_name: feature.place_name,
      context: feature.context || [],
    }));

    return locations;
  } catch (error) {
    console.error('Error searching location:', error);
    return [];
  }
};

const getPhotoFromGooglePlaces = async (placeName: string, location: string): Promise<string> => {
  const localCoffeeShopPhotos = [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1600093463592-2e8d28d7f1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  ];
  
  const combinedString = `${placeName}-${location}`;
  const hash = Array.from(combinedString).reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const index = Math.abs(hash) % localCoffeeShopPhotos.length;
  return localCoffeeShopPhotos[index];
};

const transformMapboxPlaceToShop = async (place: any): Promise<Shop> => {
  const name = place.text || place.place_name;
  const city = place.context?.find((ctx: any) => ctx.id.startsWith('place'))?.text || '';
  const state = place.context?.find((ctx: any) => ctx.id.startsWith('region'))?.text || '';
  const location = `${city}, ${state}`;
  
  const photo = await getPhotoFromGooglePlaces(name, location);
  
  return {
    id: place.id,
    name,
    address: place.properties?.address || place.place_name,
    city,
    state,
    description: `Local coffee shop in ${city || 'the area'}`,
    coordinates: {
      longitude: place.center[0],
      latitude: place.center[1],
    },
    photos: [photo],
    contact: {
      website: `https://maps.google.com/search?q=${encodeURIComponent(name + ' ' + location)}`,
    }
  };
};

export const searchNearbyShops = async (
  [longitude, latitude]: [number, number],
  radius: number = SEARCH_RADIUS
): Promise<Shop[]> => {
  try {
    const response = await axios.get(
      `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/coffee.json?proximity=${longitude},${latitude}&access_token=${MAPBOX_TOKEN}&types=poi&limit=${MAX_RESULTS}&radius=${radius}`
    );

    const nonFranchiseShops = response.data.features.filter(
      (place: any) => !isFranchise(place.text)
    );

    const shopPromises = nonFranchiseShops.map(transformMapboxPlaceToShop);
    const shops = await Promise.all(shopPromises);

    return shops;
  } catch (error) {
    console.error('Error searching nearby shops:', error);
    return [];
  }
};

export const getPlaceById = async (id: string): Promise<Shop | null> => {
  try {
    const response = await axios.get(
      `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${id}.json?access_token=${MAPBOX_TOKEN}`
    );

    if (response.data.features && response.data.features.length > 0) {
      const place = response.data.features[0];
      return await transformMapboxPlaceToShop(place);
    }
    return null;
  } catch (error) {
    console.error('Error getting place by ID:', error);
    return null;
  }
};

export const getLocationCoordinates = async (
  address: string
): Promise<[number, number] | null> => {
  try {
    const response = await axios.get(
      `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${MAPBOX_TOKEN}&limit=1`
    );

    if (response.data.features && response.data.features.length > 0) {
      return response.data.features[0].center;
    }
    return null;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

export const getBoundingBox = (
  coordinates: [number, number][],
  padding = 50
): [[number, number], [number, number]] => {
  const bounds = coordinates.reduce(
    (bounds, coord) => {
      return [
        [Math.min(bounds[0][0], coord[0]), Math.min(bounds[0][1], coord[1])],
        [Math.max(bounds[1][0], coord[0]), Math.max(bounds[1][1], coord[1])],
      ];
    },
    [
      [coordinates[0][0], coordinates[0][1]],
      [coordinates[0][0], coordinates[0][1]],
    ]
  );

  const paddingLng = (bounds[1][0] - bounds[0][0]) * (padding / 100);
  const paddingLat = (bounds[1][1] - bounds[0][1]) * (padding / 100);

  return [
    [bounds[0][0] - paddingLng, bounds[0][1] - paddingLat],
    [bounds[1][0] + paddingLng, bounds[1][1] + paddingLat],
  ];
};