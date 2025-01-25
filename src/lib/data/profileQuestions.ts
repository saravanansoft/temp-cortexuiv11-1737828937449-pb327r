export interface ProfileQuestion {
  id: string;
  text: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'number';
  required: boolean;
  options?: string[];
  nextQuestion?: string;
  dependsOn?: {
    questionId: string;
    value: string | number;
  };
}

export interface QuestionGroup {
  id: string;
  title: string;
  description: string;
  questions: ProfileQuestion[];
}

export const profileQuestions: QuestionGroup[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Help us get to know you better',
    questions: [
      {
        id: 'fullName',
        text: 'What is your full name?',
        type: 'text',
        required: true
      },
      {
        id: 'dob',
        text: 'When were you born?',
        type: 'date',
        required: true
      },
      {
        id: 'location',
        text: 'Where are you located?',
        type: 'select',
        required: true,
        options: ['United States', 'Canada', 'United Kingdom', 'Other']
      }
    ]
  },
  {
    id: 'professional',
    title: 'Professional Background',
    description: 'Tell us about your career',
    questions: [
      {
        id: 'currentRole',
        text: 'What is your current role?',
        type: 'text',
        required: true
      },
      {
        id: 'experience',
        text: 'How many years of experience do you have?',
        type: 'number',
        required: true
      },
      {
        id: 'industry',
        text: 'Which industry do you work in?',
        type: 'select',
        required: true,
        options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Other']
      }
    ]
  },
  {
    id: 'learning',
    title: 'Learning Preferences',
    description: 'Help us personalize your learning experience',
    questions: [
      {
        id: 'learningGoal',
        text: 'What is your primary learning goal?',
        type: 'select',
        required: true,
        options: [
          'Career Advancement',
          'Skill Development',
          'Personal Interest',
          'Academic Achievement'
        ]
      },
      {
        id: 'preferredTime',
        text: 'When do you prefer to learn?',
        type: 'multiselect',
        required: true,
        options: ['Morning', 'Afternoon', 'Evening', 'Late Night']
      },
      {
        id: 'weeklyCommitment',
        text: 'How many hours per week can you commit to learning?',
        type: 'select',
        required: true,
        options: ['1-2 hours', '3-5 hours', '5-10 hours', '10+ hours']
      }
    ]
  }
];