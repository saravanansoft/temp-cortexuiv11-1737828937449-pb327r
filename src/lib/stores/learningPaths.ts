import { writable } from 'svelte/store';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  created: Date;
  lastUpdated: Date;
}

function createLearningPathsStore() {
  const { subscribe, set, update } = writable<LearningPath[]>([]);

  return {
    subscribe,
    addPath: (path: Omit<LearningPath, 'id' | 'created' | 'lastUpdated'>) => {
      const newPath: LearningPath = {
        ...path,
        id: crypto.randomUUID(),
        created: new Date(),
        lastUpdated: new Date()
      };
      update(paths => [...paths, newPath]);
    },
    updatePath: (id: string, updates: Partial<LearningPath>) => {
      update(paths => paths.map(path => 
        path.id === id 
          ? { ...path, ...updates, lastUpdated: new Date() }
          : path
      ));
    },
    deletePath: (id: string) => {
      update(paths => paths.filter(path => path.id !== id));
    },
    reset: () => set([])
  };
}

export const learningPaths = createLearningPathsStore();