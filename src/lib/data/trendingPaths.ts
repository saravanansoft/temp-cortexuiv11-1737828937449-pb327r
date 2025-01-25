export interface TrendingPath {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  area: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrollments: number;
  rating: number;
  reviews: number;
  thumbnail: string;
  isBookmarked: boolean;
}

export const mockTrendingPaths: TrendingPath[] = [
  {
    id: 'tp1',
    title: 'Machine Learning Fundamentals',
    description: 'Master the basics of machine learning algorithms and their applications',
    category: 'ai',
    subCategory: 'ml',
    area: 'supervised',
    difficulty: 'Beginner',
    duration: '12 weeks',
    enrollments: 15420,
    rating: 4.8,
    reviews: 2341,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: false
  },
  {
    id: 'tp2',
    title: 'Full-Stack Web Development',
    description: 'Comprehensive guide to modern web development',
    category: 'web-dev',
    subCategory: 'frontend',
    area: 'react',
    difficulty: 'Intermediate',
    duration: '16 weeks',
    enrollments: 12850,
    rating: 4.9,
    reviews: 1987,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: true
  },
  {
    id: 'tp3',
    title: 'Deep Learning with Neural Networks',
    description: 'Advanced deep learning concepts and implementations',
    category: 'ai',
    subCategory: 'dl',
    area: 'neural-networks',
    difficulty: 'Advanced',
    duration: '14 weeks',
    enrollments: 9870,
    rating: 4.7,
    reviews: 1543,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: false
  },
  {
    id: 'tp4',
    title: 'Cloud Native Development',
    description: 'Build scalable applications using cloud technologies',
    category: 'web-dev',
    subCategory: 'backend',
    area: 'node',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    enrollments: 8540,
    rating: 4.6,
    reviews: 1232,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: false
  },
  {
    id: 'tp5',
    title: 'Natural Language Processing',
    description: 'Understanding and implementing NLP techniques',
    category: 'ai',
    subCategory: 'dl',
    area: 'nlp',
    difficulty: 'Advanced',
    duration: '12 weeks',
    enrollments: 7650,
    rating: 4.8,
    reviews: 987,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: true
  },
  {
    id: 'tp6',
    title: 'Mobile App Development',
    description: 'Create cross-platform mobile applications',
    category: 'web-dev',
    subCategory: 'frontend',
    area: 'react',
    difficulty: 'Intermediate',
    duration: '14 weeks',
    enrollments: 11230,
    rating: 4.7,
    reviews: 1876,
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: false
  },
  {
    id: 'tp7',
    title: 'Computer Vision Mastery',
    description: 'Advanced image processing and object detection',
    category: 'ai',
    subCategory: 'dl',
    area: 'cnn',
    difficulty: 'Advanced',
    duration: '15 weeks',
    enrollments: 6890,
    rating: 4.9,
    reviews: 876,
    thumbnail: 'https://images.unsplash.com/photo-1527430253228-e93688616381?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: false
  },
  {
    id: 'tp8',
    title: 'DevOps Engineering',
    description: 'Master modern DevOps practices and tools',
    category: 'web-dev',
    subCategory: 'backend',
    area: 'node',
    difficulty: 'Advanced',
    duration: '16 weeks',
    enrollments: 9340,
    rating: 4.8,
    reviews: 1432,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: true
  },
  {
    id: 'tp9',
    title: 'Reinforcement Learning',
    description: 'Build intelligent agents using RL algorithms',
    category: 'ai',
    subCategory: 'ml',
    area: 'reinforcement',
    difficulty: 'Advanced',
    duration: '12 weeks',
    enrollments: 5670,
    rating: 4.7,
    reviews: 789,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: false
  },
  {
    id: 'tp10',
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and user-friendly interfaces',
    category: 'web-dev',
    subCategory: 'frontend',
    area: 'react',
    difficulty: 'Beginner',
    duration: '8 weeks',
    enrollments: 13450,
    rating: 4.9,
    reviews: 2154,
    thumbnail: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isBookmarked: false
  }
];