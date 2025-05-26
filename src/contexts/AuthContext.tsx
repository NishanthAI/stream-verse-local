
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/video';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addToWatchHistory: (videoId: string) => void;
  addToFavorites: (videoId: string) => void;
  removeFromFavorites: (videoId: string) => void;
  addToWatchLater: (videoId: string) => void;
  removeFromWatchLater: (videoId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email);
    
    if (user) {
      setAuthState({ user, isAuthenticated: true });
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: User) => u.email === email);
    
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      watchHistory: [],
      favorites: [],
      watchLater: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setAuthState({ user: newUser, isAuthenticated: true });
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedUser: User) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setAuthState({ user: updatedUser, isAuthenticated: true });
    }
  };

  const addToWatchHistory = (videoId: string) => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        watchHistory: [videoId, ...authState.user.watchHistory.filter(id => id !== videoId)].slice(0, 20)
      };
      updateUser(updatedUser);
    }
  };

  const addToFavorites = (videoId: string) => {
    if (authState.user && !authState.user.favorites.includes(videoId)) {
      const updatedUser = {
        ...authState.user,
        favorites: [...authState.user.favorites, videoId]
      };
      updateUser(updatedUser);
    }
  };

  const removeFromFavorites = (videoId: string) => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        favorites: authState.user.favorites.filter(id => id !== videoId)
      };
      updateUser(updatedUser);
    }
  };

  const addToWatchLater = (videoId: string) => {
    if (authState.user && !authState.user.watchLater.includes(videoId)) {
      const updatedUser = {
        ...authState.user,
        watchLater: [...authState.user.watchLater, videoId]
      };
      updateUser(updatedUser);
    }
  };

  const removeFromWatchLater = (videoId: string) => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        watchLater: authState.user.watchLater.filter(id => id !== videoId)
      };
      updateUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      signup,
      logout,
      addToWatchHistory,
      addToFavorites,
      removeFromFavorites,
      addToWatchLater,
      removeFromWatchLater
    }}>
      {children}
    </AuthContext.Provider>
  );
};
