import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_LOCAL_URL;
const SEARCH_RADIUS = 25000; // 25km

interface Context { 
  id: string;
  text: string;
}

interface Location {
  center: [number, number];
  place_name: string;
  context: Context[];
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface Contact {
  website: string;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  description: string;
  coordinates: Coordinates;
  photos: string[];
  contact: {
    website?: string;
  };
}

interface Franchises {
  franchises: string[];
}

const searchLocation = async (query: string): Promise<Location[]> => {
  try {
    const response = await axios.get<Location[]>(
      `${API_BASE_URL}/api/locations/search?query=${encodeURIComponent(query)}`
    );
    return response.data;
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

const searchNearbyShops = async (
  [longitude, latitude]: [number, number],
  radius: number = SEARCH_RADIUS
): Promise<Shop[]> => {
  try {
    const response = await axios.get<Shop[]>(
      `${API_BASE_URL}/api/shops/nearby?longitude=${longitude}&latitude=${latitude}&radius=${radius}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching nearby shops:', error);
    return [];
  }
};

const getPlaceById = async (id: string): Promise<Shop | null> => {
  try {
    const response = await axios.get<Shop>(`${API_BASE_URL}/api/shops/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting place by ID:', error);
    return null;
  }
};

const getLocationCoordinates = async (address: string): Promise<[number, number] | null> => {
  try {
    const response = await axios.get<{ coordinates: [number, number] }>(
      `${API_BASE_URL}/api/locations/coordinates?address=${encodeURIComponent(address)}`
    );
    return response.data.coordinates;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

const getBoundingBox = (
  coordinates: [number, number][],
  padding: number = 50
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

export {
  searchLocation,
  searchNearbyShops,
  getPlaceById,
  getLocationCoordinates,
  getBoundingBox,
  type Shop,
  type Location,
  type Coordinates,
  type Contact
};