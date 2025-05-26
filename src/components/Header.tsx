
import React, { useState } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onAuthClick }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-white">StreamFlix</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Movies</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">TV Shows</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">My List</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>
            </form>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">Welcome, {user?.name}</span>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-slate-700"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={onAuthClick}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
