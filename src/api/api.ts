import axios, { AxiosError } from 'axios';
import { ApiResponse, Shop } from '../types/shop';

const API_URL = import.meta.env.VITE_API_LOCAL_URL;

// Axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler helper
const handleApiError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    throw {
      error: error.response?.data?.message || 'An error occurred while fetching data',
      status: error.response?.status,
    };
  }
  throw { error: 'An unexpected error occurred', status: 500 };
};

// Mock data for development
const mockShop: Shop = {
  id: '1',
  name: 'Artisan Coffee House',
  address: '123 Coffee Street',
  city: 'Kansas City',
  state: 'MO',
  rating: 4.8,
  description: 'A cozy coffee shop specializing in single-origin beans and pour-over brewing methods. Our master baristas are dedicated to crafting the perfect cup of coffee for every customer.',
  hours: {
    Monday: '7:00 AM - 6:00 PM',
    Tuesday: '7:00 AM - 6:00 PM',
    Wednesday: '7:00 AM - 6:00 PM',
    Thursday: '7:00 AM - 6:00 PM',
    Friday: '7:00 AM - 7:00 PM',
    Saturday: '8:00 AM - 7:00 PM',
    Sunday: '8:00 AM - 5:00 PM'
  },
  photos: [
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2940'
  ],
  specialties: [
    'Pour-over Coffee',
    'Single-origin Espresso',
    'House-made Syrups',
    'Artisan Pastries'
  ],
  priceRange: '$$',
  contact: {
    phone: '(555) 123-4567',
    email: 'hello@artisancoffee.com',
    website: 'https://artisancoffee.com'
  },
  amenities: [
    'Free Wi-Fi',
    'Outdoor Seating',
    'Power Outlets',
    'Wheelchair Accessible',
    'Pet Friendly',
    'Credit Cards Accepted'
  ]
};

/**
 * Search shops by query
 */
export const searchShops = async (query: string): Promise<ApiResponse<Shop[]>> => {
  try {
    // For development, return mock data if searching for Kansas City
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (query.toLowerCase().includes('kansas city')) {
      return { data: [mockShop] };
    }
    return { data: [] };
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get shop by ID
 */
export const getShopById = async (id: string): Promise<ApiResponse<Shop>> => {
  try {
    // For development, return mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: mockShop };
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Add shop to favorites
 */
export const addToFavorites = async (id: string): Promise<void> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  } catch (error) {
    return handleApiError(error);
  }
};