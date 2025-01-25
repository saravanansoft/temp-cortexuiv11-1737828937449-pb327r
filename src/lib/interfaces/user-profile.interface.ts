export interface LearningPreference {
  learningStyle?: string;
  collaborationPreference?: string;
  learningPace?: string;
  schedule?: string;
  preferredTopics?: string;
}

export interface ProfessionalInfo {
  currentRole?: string;
  industry?: string;
  yearsOfExperience?: number;
  currentRoleSkills?: string;
  currentRoleLearningNeeds?: string;
}

export interface CareerEntry {
  id: string;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  keyResponsibilities?: string;
  keyAchievements?: string;
}

export interface CareerGoal {
  id: string;
  type: 'Short Term' | 'Long Term';
  targetDate: string;
  description: string;
}

export interface Skills {
  technicalSkills?: string[];
  softSkills?: string[];
  certifications?: string[];
  languages?: string[];
}

export interface Hobbies {
  interests?: string[];
  description?: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  location?: string;
  preferredLanguage?: string;
  sex?: string;
  learningPreferences?: LearningPreference;
  professionalInfo?: ProfessionalInfo;
  careerHistory?: CareerEntry[];
  careerGoals?: CareerGoal[];
  skills?: Skills;
  hobbies?: Hobbies;
}