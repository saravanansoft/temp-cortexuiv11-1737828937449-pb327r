// Request Types
export interface GenerateLearningPathRequest {
  topic: string;
  subtopic?: string;
  area?: string;
  description?: string;
  user_level?: "beginner" | "intermediate" | "advanced";
  preferredDuration?: number;
  learningStyle?: "visual" | "auditory" | "reading" | "kinesthetic";
}

export interface GenerateModuleContentRequest {
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  preferredLength?: "short" | "medium" | "long";
  format?: "markdown" | "html";
}

// Response Types
export interface topic {
  title: string;
  duration: number;
}
export interface LearningModule {
  title: string;
  description: string;
  topics: topic[];
  //   content: string;
  //   estimatedDuration: number;
  //   difficulty: "beginner" | "intermediate" | "advanced";
  //   prerequisites?: string[];
  //   learningObjectives: string[];
  //   resources: LearningResource[];
}

export interface LearningResource {
  type: "video" | "article" | "exercise" | "quiz";
  url: string;
  title: string;
  duration?: number;
}

export interface GenerateLearningPathResponse {
  //   id: string;
  //   title: string;
  //   description: string;
  //   totalDuration: number;
  //   user_level: "beginner" | "intermediate" | "advanced";
  //   modules: LearningModule[];
  //   metadata: LearningPathMetadata;
  modules: LearningModule[];
  //resources: LearningResource;
  assessmentAndEvaluation: AssessmentAndEvaluation;
}

export interface LearningPathMetadata {
  createdAt: string;
  topic: string;
  subtopic?: string;
  area?: string;
  aiGenerated: true;
}

export interface GenerateModuleContentResponse {
  id: string;
  content: string;
  format: "markdown" | "html";
  metadata: ModuleContentMetadata;
}

export interface ModuleContentMetadata {
  topic: string;
  readingTime: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  keywords: string[];
  generatedAt: string;
}

// AssessmentAndEvaluation interface
export interface AssessmentAndEvaluation {
  quizzesAndTests: Quiz[];
  projectBasedEvaluations: Project[];
  learningTipsAndStrategies: LearningTips;
  prerequisitesAndNextSteps: Prerequisites;
}

// Quiz interface
export interface Quiz {
  title: string;
  duration: number;
}

// Project interface
export interface Project {
  title: string;
  duration: number;
}

// LearningTips interface
export interface LearningTips {
  timeManagement: string[];
  activeLearning: string[];
  noteTakingAndOrganization: string[];
  communityEngagement: string[];
}

// Prerequisites interface
export interface Prerequisites {
  prerequisites: string[];
  nextSteps: string[];
}
