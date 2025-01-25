// import { learningTopics } from '../data/topicsData';
// import type { Topic, SubTopic, Area } from '../data/topicsData';

// // Simulate API calls with delayed responses
// export async function fetchTopics(): Promise<Topic[]> {
//   await new Promise(resolve => setTimeout(resolve, 800));
//   return learningTopics;
// }

// export async function fetchSubtopics(topicId: string): Promise<SubTopic[]> {
//   await new Promise(resolve => setTimeout(resolve, 600));
//   const topic = learningTopics.find(t => t.id === topicId);
//   return topic?.subtopics || [];
// }

// export async function fetchAreas(topicId: string, subtopicId: string): Promise<Area[]> {
//   await new Promise(resolve => setTimeout(resolve, 400));
//   const topic = learningTopics.find(t => t.id === topicId);
//   const subtopic = topic?.subtopics?.find(s => s.id === subtopicId);
//   return subtopic?.areas || [];
// }

import type { Topic, SubTopic, Area } from "../data/topicsData";
import { learningPathService } from "../services/learningPathService";

// Shared data store
export class TopicsDataService {
  private static instance: TopicsDataService;
  private _topics: Topic[] = [];
  private _isLoaded = false;

  private constructor() {}

  // Singleton pattern
  public static getInstance(): TopicsDataService {
    if (!TopicsDataService.instance) {
      TopicsDataService.instance = new TopicsDataService();
    }
    return TopicsDataService.instance;
  }

  // Transform raw JSON to our required structure
  private transformTopicsData(data: any): Topic[] {
    const topicNode = data["Topic Node"];
    return [
      {
        id: data["_id"],
        name: topicNode.Name,
        description: topicNode.Description,
        subtopics: topicNode.Subtopics.map((subtopic: any) => ({
          id: subtopic["Subtopic Name"].replace(/\s+/g, "-").toLowerCase(),
          name: subtopic["Subtopic Name"],
          description: subtopic["Subtopic Description"],
          importanceRating: subtopic["Importance Rating"],
          tags: subtopic.Tags,
          areas:
            subtopic["Leaf Node"]?.map((area: any) => ({
              id: area["Subtopic Name"].replace(/\s+/g, "-").toLowerCase(),
              name: area["Subtopic Name"],
              description: area["Subtopic Description"],
              importanceRating: area["Importance Rating"],
              tags: area.Tags,
            })) || [],
        })),
      },
    ];
  }

  // Initial fetch of topics
  public async fetchTopics(): Promise<Topic[]> {
    // If already loaded, return existing topics
    if (this._isLoaded) {
      return this._topics;
    }

    try {
      // In a real app, replace with actual API call
      const data = await learningPathService.getGlobalKnowledgePath(
        "675f93d9e861b6fc3a95ba5c"
      );

      // Transform and store topics
      console.log("this is topic response ", data);
      this._topics = this.transformTopicsData(data);

      this._isLoaded = true;

      return this._topics;
    } catch (error) {
      console.error("Error fetching topics:", error);
      return [];
    }
  }

  // Fetch subtopics using stored topics
  public async fetchSubtopics(topicId: string): Promise<SubTopic[]> {
    // Ensure topics are loaded
    if (!this._isLoaded) {
      await this.fetchTopics();
    }

    const topic = this._topics.find((t) => t.id === topicId);
    return topic?.subtopics || [];
  }

  // Fetch areas using stored topics and subtopics
  public async fetchAreas(
    topicId: string,
    subtopicId: string
  ): Promise<Area[]> {
    // Ensure topics are loaded
    if (!this._isLoaded) {
      await this.fetchTopics();
    }

    const topic = this._topics.find((t) => t.id === topicId);
    const subtopic = topic?.subtopics.find((s) => s.id === subtopicId);
    return subtopic?.areas || [];
  }
}

// Export methods for easier use
export const topicsService = TopicsDataService.getInstance();

export async function fetchTopics(): Promise<Topic[]> {
  return topicsService.fetchTopics();
}

export async function fetchSubtopics(topicId: string): Promise<SubTopic[]> {
  return topicsService.fetchSubtopics(topicId);
}

export async function fetchAreas(
  topicId: string,
  subtopicId: string
): Promise<Area[]> {
  return topicsService.fetchAreas(topicId, subtopicId);
}
