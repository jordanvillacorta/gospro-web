import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export const requestVerificationCode = async (phoneNumber: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/request-code`, { phoneNumber });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send verification code');
  }
};

export const verifyCode = async (phoneNumber: string, code: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify`, {
      phoneNumber,
      verificationCode: code
    });
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('isAuthenticated', 'true');
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Invalid verification code');
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
};