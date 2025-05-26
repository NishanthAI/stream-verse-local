
import { Video } from '../types/video';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'The Future of Technology',
    description: 'Explore the latest advancements in AI, machine learning, and quantum computing that are shaping our future.',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop',
    duration: '15:32',
    category: 'Technology',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    uploadDate: '2024-01-15',
    views: 125000,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Beautiful Nature Documentary',
    description: 'Journey through breathtaking landscapes and discover the wonders of our natural world.',
    thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=450&fit=crop',
    duration: '45:18',
    category: 'Nature',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    uploadDate: '2024-01-10',
    views: 89000,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Modern Living Spaces',
    description: 'Get inspired by contemporary interior design and learn how to transform your living space.',
    thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=450&fit=crop',
    duration: '22:45',
    category: 'Lifestyle',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    uploadDate: '2024-01-08',
    views: 67000,
    rating: 4.6
  },
  {
    id: '4',
    title: 'Digital Photography Masterclass',
    description: 'Master the art of digital photography with professional tips and techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=450&fit=crop',
    duration: '38:12',
    category: 'Education',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    uploadDate: '2024-01-12',
    views: 156000,
    rating: 4.7
  },
  {
    id: '5',
    title: 'Coding Best Practices',
    description: 'Learn essential coding practices that every developer should know for clean, maintainable code.',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop',
    duration: '28:56',
    category: 'Technology',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    uploadDate: '2024-01-05',
    views: 203000,
    rating: 4.9
  },
  {
    id: '6',
    title: 'Mindfulness and Meditation',
    description: 'Discover the benefits of mindfulness and learn meditation techniques for daily practice.',
    thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=450&fit=crop',
    duration: '18:24',
    category: 'Wellness',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    uploadDate: '2024-01-03',
    views: 94000,
    rating: 4.8
  }
];

export const categories = ['All', 'Technology', 'Nature', 'Lifestyle', 'Education', 'Wellness'];
