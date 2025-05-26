
import React, { useState } from 'react';
import { X, Heart, BookmarkPlus, Clock } from 'lucide-react';
import { Video } from '../types/video';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

interface VideoPlayerProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isOpen, onClose }) => {
  const { user, isAuthenticated, addToWatchHistory, addToFavorites, removeFromFavorites, addToWatchLater, removeFromWatchLater } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  if (!video) return null;

  const isFavorite = user?.favorites.includes(video.id) || false;
  const isInWatchLater = user?.watchLater.includes(video.id) || false;

  const handlePlay = () => {
    if (isAuthenticated) {
      addToWatchHistory(video.id);
    }
    setIsLoading(false);
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(video.id);
    } else {
      addToFavorites(video.id);
    }
  };

  const handleWatchLaterClick = () => {
    if (isInWatchLater) {
      removeFromWatchLater(video.id);
    } else {
      addToWatchLater(video.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-slate-900 border-slate-700 p-0">
        <div className="relative">
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
          >
            <X className="w-4 h-4 text-white" />
          </Button>
          
          <div className="aspect-video bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p>Loading video...</p>
                </div>
              </div>
            )}
            <iframe
              src={video.videoUrl}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              onLoad={handlePlay}
            />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{video.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
                  <span className="bg-slate-700 px-2 py-1 rounded">{video.category}</span>
                  <span>{video.duration}</span>
                  <span>{video.views.toLocaleString()} views</span>
                  <span>★ {video.rating}</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              {isAuthenticated && (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleFavoriteClick}
                    variant="outline"
                    size="sm"
                    className={`${isFavorite ? 'bg-red-500 border-red-500 text-white' : 'border-slate-600 text-slate-400'} hover:bg-red-500 hover:border-red-500 hover:text-white`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Favorited' : 'Add to Favorites'}
                  </Button>
                  <Button
                    onClick={handleWatchLaterClick}
                    variant="outline"
                    size="sm"
                    className={`${isInWatchLater ? 'bg-purple-500 border-purple-500 text-white' : 'border-slate-600 text-slate-400'} hover:bg-purple-500 hover:border-purple-500 hover:text-white`}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {isInWatchLater ? 'In Watch Later' : 'Watch Later'}
                  </Button>
                </div>
              )}
            </div>
            
            <p className="text-slate-300 leading-relaxed">{video.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
