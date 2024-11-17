import axios, { AxiosError } from 'axios';
import { ApiResponse, Shop } from '../types/shop';
import { mockShops } from '../data/mockShops';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

/**
 * Search shops by query
 */
export const searchShops = async (query: string): Promise<ApiResponse<Shop[]>> => {
  try {
    // For development, filter mock data based on search query
    await new Promise(resolve => setTimeout(resolve, 1000));
    const searchTerm = query.toLowerCase();
    const filteredShops = mockShops.filter(shop => 
      shop.name.toLowerCase().includes(searchTerm) ||
      shop.city.toLowerCase().includes(searchTerm) ||
      shop.description.toLowerCase().includes(searchTerm)
    );
    console.log('Filtered shops:', filteredShops); // Debug log
    return { data: filteredShops };
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get shop by ID
 */
export const getShopById = async (id: string): Promise<ApiResponse<Shop>> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const shop = mockShops.find(s => s.id === id);
    if (!shop) {
      throw new Error('Shop not found');
    }
    return { data: shop };
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Add shop to favorites
 */
export const addToFavorites = async (id: string): Promise<void> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  } catch (error) {
    return handleApiError(error);
  }
};