import { writable } from 'svelte/store';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  created: Date;
}

const defaultPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript',
    progress: 30,
    created: new Date('2024-02-01')
  },
  {
    id: '2',
    title: 'Data Science Essentials',
    description: 'Introduction to data science concepts and tools',
    progress: 15,
    created: new Date('2024-02-05')
  }
];

export const learningPaths = writable<LearningPath[]>(defaultPaths);