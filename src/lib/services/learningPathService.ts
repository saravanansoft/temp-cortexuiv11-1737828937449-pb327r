import { apiService } from "./apiService";
import type { LearningPath } from "../data/mockLearningPaths";

class LearningPathService {
  private readonly basePath = "/learning-paths";

  async createLearningPath(path: LearningPath): Promise<LearningPath> {
    try {
      console.log("this  basepath", this.basePath);
      console.log(path);
      return await apiService.post<LearningPath>(this.basePath, path);
    } catch (error) {
      console.error("Failed to create learning path:", error);
      throw new Error("Failed to create learning path");
    }
  }

  async getLearningPaths(userId: string): Promise<LearningPath[]> {
    try {
      return await apiService.get<LearningPath[]>(
        `/users/${userId}/${this.basePath}`
      );
    } catch (error) {
      console.error("Failed to fetch learning paths:", error);
      throw new Error("Failed to fetch learning paths");
    }
  }

  async getLearningModule(pathId: string): Promise<LearningPath> {
    try {
      return await apiService.get<LearningPath>(`${this.basePath}/${pathId}`);
    } catch (error) {
      console.error("Failed to fetch learning module:", error);
      throw new Error("Failed to fetch learning module");
    }
  }

  async updateLearningPath(
    id: string,
    updates: Partial<LearningPath>
  ): Promise<LearningPath> {
    try {
      return await apiService.put<LearningPath>(
        `${this.basePath}/${id}`,
        updates
      );
    } catch (error) {
      console.error("Failed to update learning path:", error);
      throw new Error("Failed to update learning path");
    }
  }

  async deleteLearningPath(id: string): Promise<void> {
    try {
      await apiService.delete(`${this.basePath}/${id}`);
    } catch (error) {
      console.error("Failed to delete learning path:", error);
      throw new Error("Failed to delete learning path");
    }
  }

  async getGlobalKnowledgePath(Id: string): Promise<any> {
    try {
      return await apiService.get<any>(`/knowledgegraphs/${Id}`);
    } catch (error) {
      console.error("Failed to fetch learning module:", error);
      throw new Error("Failed to fetch learning module");
    }
  }
}
export const learningPathService = new LearningPathService();
