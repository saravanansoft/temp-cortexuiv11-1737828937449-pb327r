import { mockTrendingPaths } from '../data/trendingPaths';
import type { TrendingPath } from '../data/trendingPaths';

export async function fetchTrendingPaths(filters?: {
  category?: string;
  subCategory?: string;
  area?: string;
  difficulty?: string;
}): Promise<TrendingPath[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let filteredPaths = [...mockTrendingPaths];

  if (filters) {
    if (filters.category) {
      filteredPaths = filteredPaths.filter(path => path.category === filters.category);
    }
    if (filters.subCategory) {
      filteredPaths = filteredPaths.filter(path => path.subCategory === filters.subCategory);
    }
    if (filters.area) {
      filteredPaths = filteredPaths.filter(path => path.area === filters.area);
    }
    if (filters.difficulty) {
      filteredPaths = filteredPaths.filter(path => path.difficulty === filters.difficulty);
    }
  }

  return filteredPaths;
}

export async function toggleBookmark(pathId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return true;
}

export async function addToLearningPath(pathId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
}