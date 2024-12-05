// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock verification codes storage
const verificationCodes: Record<string, string> = {};

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export const requestVerificationCode = async (phoneNumber: string): Promise<AuthResponse> => {
  await delay(1000); // Simulate network delay

  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[phoneNumber] = code;
  
  console.log(`Mock SMS: Your verification code is ${code}`); // For testing purposes
  
  return {
    success: true,
    message: 'Verification code sent successfully'
  };
};

export const verifyCode = async (phoneNumber: string, code: string): Promise<AuthResponse> => {
  await delay(1000); // Simulate network delay

  const storedCode = verificationCodes[phoneNumber];
  
  if (!storedCode) {
    throw new Error('No verification code found for this number');
  }

  if (code !== storedCode) {
    throw new Error('Invalid verification code');
  }

  // Generate a mock JWT token
  const token = `mock_token_${Date.now()}`;

  // Clean up the stored code
  delete verificationCodes[phoneNumber];

  return {
    success: true,
    message: 'Verification successful',
    token
  };
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
};