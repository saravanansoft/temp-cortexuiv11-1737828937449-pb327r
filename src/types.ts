export interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  lastAccessed: Date;
}

export interface ProfileQuestion {
  id: string;
  text: string;
  type: 'text' | 'select' | 'multiselect' | 'date';
  options?: string[];
  nextQuestion?: string;
  required?: boolean;
}