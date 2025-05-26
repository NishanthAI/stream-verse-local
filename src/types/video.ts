
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  videoUrl: string;
  uploadDate: string;
  views: number;
  rating: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  watchHistory: string[];
  favorites: string[];
  watchLater: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
