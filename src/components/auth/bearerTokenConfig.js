import axios from 'axios';

// Set up base URL if needed
axios.defaults.baseURL = 'http://your-backend-api.com'; // Change to your backend URL

// Attach Authorization header
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
