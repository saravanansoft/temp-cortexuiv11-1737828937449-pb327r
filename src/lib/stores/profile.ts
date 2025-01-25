import { writable } from 'svelte/store';

export interface Question {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'number';
  required: boolean;
  options?: string[];
}

export interface QuestionGroup {
  title: string;
  questions: Question[];
}

const defaultQuestions: QuestionGroup[] = [
  {
    title: "Personal Information",
    questions: [
      {
        id: "fullName",
        label: "Full Name",
        type: "text",
        required: true
      },
      {
        id: "dob",
        label: "Date of Birth",
        type: "date",
        required: true
      }
    ]
  },
  {
    title: "Professional Information",
    questions: [
      {
        id: "profession",
        label: "Current Profession",
        type: "text",
        required: true
      },
      {
        id: "experience",
        label: "Years of Experience",
        type: "number",
        required: true
      }
    ]
  },
  {
    title: "Location",
    questions: [
      {
        id: "country",
        label: "Country",
        type: "select",
        required: true,
        options: ["United States", "Canada", "United Kingdom", "Other"]
      }
    ]
  }
];

export const profileQuestions = writable<QuestionGroup[]>(defaultQuestions);