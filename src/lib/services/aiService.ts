import { apiService } from "./apiService";
import type {
  GenerateLearningPathRequest,
  GenerateLearningPathResponse,
  GenerateModuleContentRequest,
  GenerateModuleContentResponse,
} from "../interfaces/learning-path.interface";
import { authStore } from "./authService";

class AiService {
  async generateLearningPath(
    request: GenerateLearningPathRequest
  ): Promise<GenerateLearningPathResponse> {
    try {
      const userId = authStore.getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }
      return await apiService.post<GenerateLearningPathResponse>(
        "/learning-path",
        request
      );
    } catch (error) {
      console.error("Failed to generate learning path:", error);

      // Fallback to mock data in case of API failure
      return {
        id: crypto.randomUUID(),
        title: `${request.topic} Learning Path`,
        description: `Personalized learning path for ${
          request.area || request.topic
        }`,
        totalDuration: 1200, // 20 hours in minutes
        difficulty: request.difficulty || "beginner",
        modules: [
          {
            id: crypto.randomUUID(),
            title: "Foundation Skills",
            description: "Essential skills for your journey",
            content: "Generated content based on user profile...",
            estimatedDuration: 600,
            difficulty: "beginner",
            learningObjectives: [
              "Understand basic concepts",
              "Apply fundamental principles",
            ],
            resources: [
              {
                type: "video",
                url: "https://example.com/intro",
                title: "Introduction to the Topic",
                duration: 30,
              },
            ],
          },
          {
            id: crypto.randomUUID(),
            title: "Advanced Concepts",
            description: "Taking your skills to the next level",
            content: "More generated content...",
            estimatedDuration: 600,
            difficulty: "intermediate",
            learningObjectives: [
              "Master advanced techniques",
              "Build complex projects",
            ],
            resources: [
              {
                type: "exercise",
                url: "https://example.com/practice",
                title: "Hands-on Practice",
              },
            ],
          },
        ],
        metadata: {
          createdAt: new Date().toISOString(),
          topic: request.topic,
          subtopic: request.subtopic,
          area: request.area,
          aiGenerated: true,
        },
      };
    }
  }

  async generateModuleContent(
    request: GenerateModuleContentRequest
  ): Promise<GenerateModuleContentResponse> {
    try {
      const userId = authStore.getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }
      return await apiService.post<GenerateModuleContentResponse>(
        "/modules/generate-content",
        request
      );
    } catch (error) {
      console.error("Failed to generate module content:", error);
      return {
        id: crypto.randomUUID(),
        content: `AI-generated content for ${request.topic}...`,
        format: request.format || "markdown",
        metadata: {
          topic: request.topic,
          readingTime: 10,
          difficulty: request.difficulty,
          keywords: [request.topic],
          generatedAt: new Date().toISOString(),
        },
      };
    }
  }
}

export const aiService = new AiService();

// Export the methods for backward compatibility
export const generateLearningPath = (request: GenerateLearningPathRequest) =>
  aiService.generateLearningPath(request);

export const generateModuleContent = (
  topic: string,
  options: Partial<GenerateModuleContentRequest> = {}
) =>
  aiService.generateModuleContent({
    topic,
    difficulty: "beginner",
    ...options,
  });
