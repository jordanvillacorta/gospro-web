export interface Shop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  description: string;
  photos: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PhotoUploadResponse {
  url: string;
  id: string;
}

export interface FavoriteShop extends Shop {
  favorited_at: string;
}