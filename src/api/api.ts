import axios from 'axios';
import { ApiResponse, Shop } from '../types/shop';

const API_URL = import.meta.env.VITE_API_URL;

// Mock data for demonstration
const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Artisan Coffee House',
    address: '123 Coffee Street',
    city: 'Kansas City',
    state: 'MO',
    description: 'A cozy coffee shop specializing in single-origin beans and pour-over brewing methods.',
    rating: 4.8,
    coordinates: {
      latitude: 39.0997,
      longitude: -94.5786
    },
    hours: {
      Monday: '7:00 AM - 6:00 PM',
      Tuesday: '7:00 AM - 6:00 PM',
      Wednesday: '7:00 AM - 6:00 PM',
      Thursday: '7:00 AM - 6:00 PM',
      Friday: '7:00 AM - 7:00 PM',
      Saturday: '8:00 AM - 7:00 PM',
      Sunday: '8:00 AM - 5:00 PM'
    },
    photos: ['https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2940'],
    specialties: ['Pour-over Coffee', 'Single-origin Espresso', 'House-made Syrups'],
    priceRange: '$$',
    contact: {
      phone: '(555) 123-4567',
      email: 'hello@artisancoffee.com',
      website: 'https://artisancoffee.com'
    },
    amenities: ['Free Wi-Fi', 'Outdoor Seating', 'Power Outlets']
  },
  {
    id: '2',
    name: 'The Coffee Lab',
    address: '456 Science Ave',
    city: 'Kansas City',
    state: 'MO',
    description: 'Experimental coffee shop pushing the boundaries of brewing techniques.',
    rating: 4.9,
    coordinates: {
      latitude: 39.1097,
      longitude: -94.5886
    },
    hours: {
      Monday: '6:30 AM - 7:00 PM',
      Tuesday: '6:30 AM - 7:00 PM',
      Wednesday: '6:30 AM - 7:00 PM',
      Thursday: '6:30 AM - 7:00 PM',
      Friday: '6:30 AM - 8:00 PM',
      Saturday: '7:00 AM - 8:00 PM',
      Sunday: '7:00 AM - 6:00 PM'
    },
    photos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2940'],
    specialties: ['Nitrogen-infused Coffee', 'Coffee Flights', 'Molecular Foam Art'],
    priceRange: '$$$',
    contact: {
      phone: '(555) 987-6543',
      email: 'brew@coffeelab.com',
      website: 'https://coffeelab.com'
    },
    amenities: ['Free Wi-Fi', 'Study Space', 'Brewing Classes']
  }
];

// Mock favorites storage
let mockFavorites: Set<string> = new Set();

export const searchShops = async (query: string): Promise<ApiResponse<Shop[]>> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const searchTerm = query.toLowerCase();
  const filteredShops = mockShops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm) ||
    shop.city.toLowerCase().includes(searchTerm) ||
    shop.description.toLowerCase().includes(searchTerm)
  );
  return { data: filteredShops };
};

export const getShops = async (): Promise<ApiResponse<Shop[]>> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { data: mockShops };
};

export const getShopById = async (id: string): Promise<ApiResponse<Shop>> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const shop = mockShops.find(s => s.id === id);
  if (!shop) throw new Error('Shop not found');
  return { data: shop };
};

export const addToFavorites = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  mockFavorites.add(id);
};

export const removeFromFavorites = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  mockFavorites.delete(id);
};

export const getFavorites = async (): Promise<ApiResponse<Shop[]>> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const favoriteShops = mockShops.filter(shop => mockFavorites.has(shop.id));
  return { data: favoriteShops };
};

export const isFavorite = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockFavorites.has(id);
};