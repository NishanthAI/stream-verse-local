
import React from 'react';
import { Play, Heart, BookmarkPlus, Clock } from 'lucide-react';
import { Video } from '../types/video';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const { user, isAuthenticated, addToFavorites, removeFromFavorites, addToWatchLater, removeFromWatchLater } = useAuth();
  
  const isFavorite = user?.favorites.includes(video.id) || false;
  const isInWatchLater = user?.watchLater.includes(video.id) || false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(video.id);
    } else {
      addToFavorites(video.id);
    }
  };

  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchLater) {
      removeFromWatchLater(video.id);
    } else {
      addToWatchLater(video.id);
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-slate-800 border-slate-700 overflow-hidden">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <Button
            onClick={() => onPlay(video)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-600 hover:bg-purple-700 rounded-full p-3"
          >
            <Play className="w-6 h-6 text-white" />
          </Button>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-semibold text-lg line-clamp-2 flex-1">{video.title}</h3>
          {isAuthenticated && (
            <div className="flex space-x-1 ml-2">
              <Button
                onClick={handleFavoriteClick}
                variant="ghost"
                size="sm"
                className={`p-1 ${isFavorite ? 'text-red-500' : 'text-slate-400'} hover:text-red-500`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                onClick={handleWatchLaterClick}
                variant="ghost"
                size="sm"
                className={`p-1 ${isInWatchLater ? 'text-purple-500' : 'text-slate-400'} hover:text-purple-500`}
              >
                <Clock className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-slate-400 text-sm line-clamp-3 mb-3">{video.description}</p>
        
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span className="bg-slate-700 px-2 py-1 rounded">{video.category}</span>
          <div className="flex items-center space-x-2">
            <span>{video.views.toLocaleString()} views</span>
            <span>★ {video.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
