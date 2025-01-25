import { mockQuizzes } from '../data/mockQuizData';
import type { Quiz } from '../data/mockQuizData';

export async function fetchQuiz(moduleId: string): Promise<Quiz | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockQuizzes.find(quiz => quiz.moduleId === moduleId);
}