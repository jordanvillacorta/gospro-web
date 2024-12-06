import axios from 'axios';
import type { ApiResponse, Shop } from '../types/shop';

const API_URL = 'http://localhost:3000/api';

export const searchShops = async (query: string): Promise<ApiResponse<Shop[]>> => {
  try {
    const response = await axios.get(`${API_URL}/shops/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};