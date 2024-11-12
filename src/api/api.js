import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '<http://localhost:3000>';

// Fetch all shops
export const getShops = async () => {
  return await axios.get(`${API_URL}/shops`);
};

// Fetch a single shop by ID
export const getShopById = async (shopId) => {
  return await axios.get(`${API_URL}/shops/${shopId}`);
};

// Add shop to favorites
export const addToFavorites = async (shopId) => {
  return await axios.post(`${API_URL}/favorites`, { shopId });
};

// Get user's favorites
export const getFavorites = async () => {
  return await axios.get(`${API_URL}/favorites`);
};

// Upload photo
export const uploadPhoto = async (shopId, formData) => {
  return await axios.post(`${API_URL}/shops/${shopId}/photos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
