
import React, { useState } from 'react';
import { Heart, Clock, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockVideos } from '../data/mockVideos';
import { Video } from '../types/video';
import VideoCard from './VideoCard';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface UserListsProps {
  onVideoPlay: (video: Video) => void;
}

const UserLists: React.FC<UserListsProps> = ({ onVideoPlay }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Sign in to see your personal lists</p>
      </div>
    );
  }

  const favoriteVideos = mockVideos.filter(video => user.favorites.includes(video.id));
  const watchLaterVideos = mockVideos.filter(video => user.watchLater.includes(video.id));
  const watchHistoryVideos = mockVideos.filter(video => user.watchHistory.includes(video.id));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">My Lists</h2>
      
      <Tabs defaultValue="favorites" className="w-full">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="favorites" className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Favorites ({favoriteVideos.length})</span>
          </TabsTrigger>
          <TabsTrigger value="watchlater" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Watch Later ({watchLaterVideos.length})</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <History className="w-4 h-4" />
            <span>History ({watchHistoryVideos.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="favorites" className="mt-6">
          {favoriteVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteVideos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={onVideoPlay} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No favorite videos yet</p>
              <p className="text-slate-500 text-sm">Click the heart icon on videos to add them here</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="watchlater" className="mt-6">
          {watchLaterVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watchLaterVideos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={onVideoPlay} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No videos in watch later</p>
              <p className="text-slate-500 text-sm">Save videos to watch later by clicking the clock icon</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          {watchHistoryVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watchHistoryVideos.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={onVideoPlay} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No watch history</p>
              <p className="text-slate-500 text-sm">Videos you watch will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserLists;
