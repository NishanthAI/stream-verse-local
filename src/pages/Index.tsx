
import React, { useState, useMemo } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import Header from '../components/Header';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import AuthModal from '../components/AuthModal';
import CategoryFilter from '../components/CategoryFilter';
import UserLists from '../components/UserLists';
import { mockVideos, categories } from '../data/mockVideos';
import { Video } from '../types/video';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('browse');

  const filteredVideos = useMemo(() => {
    let filtered = mockVideos;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleVideoPlay = (video: Video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('browse');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header 
          onSearch={handleSearch}
          onAuthClick={() => setIsAuthModalOpen(true)}
        />
        
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-slate-800 border-slate-700 mb-8">
              <TabsTrigger value="browse">Browse Videos</TabsTrigger>
              <TabsTrigger value="mylists">My Lists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Discover Amazing Content
                  </h1>
                  <p className="text-slate-400 text-lg">
                    Stream your favorite videos anytime, anywhere
                  </p>
                </div>

                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />

                {searchQuery && (
                  <div className="mb-6">
                    <h2 className="text-xl text-white">
                      Search results for "{searchQuery}" ({filteredVideos.length} videos)
                    </h2>
                  </div>
                )}

                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredVideos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onPlay={handleVideoPlay}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-400 text-lg">No videos found</p>
                    <p className="text-slate-500">Try adjusting your search or category filter</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="mylists">
              <UserLists onVideoPlay={handleVideoPlay} />
            </TabsContent>
          </Tabs>
        </main>

        <VideoPlayer
          video={selectedVideo}
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
};

export default Index;
