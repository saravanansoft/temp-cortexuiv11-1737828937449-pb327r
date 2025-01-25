export interface Module {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  topics?: Topic[];
}

export interface Topic {
  id: number;
  title: string;
  duration: number;
  completed: boolean;
}

export interface LearningPath {
  _id: string;
  title: string;
  description: string;
  progress: number;
  created: Date;
  lastAccessed: Date;
  modules: Module[];
  aiGenerated: boolean;
}

export const mockLearningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Web Development Mastery",
    description: "Comprehensive path to become a full-stack developer",
    progress: 45,
    created: new Date("2024-02-01"),
    lastAccessed: new Date("2024-02-15"),
    aiGenerated: true,
    modules: [
      {
        id: "m1",
        title: "HTML & CSS Foundations",
        description:
          "Master the building blocks of web development with modern HTML5 and CSS3 techniques.",
        completed: true,
        topics: [
          {
            id: "t1",
            title: "HTML5 Semantic Elements",
            duration: 45,
            completed: true,
          },
          {
            id: "t2",
            title: "CSS Flexbox & Grid",
            duration: 60,
            completed: true,
          },
          {
            id: "t3",
            title: "Responsive Design Principles",
            duration: 45,
            completed: false,
          },
        ],
      },
      {
        id: "m2",
        title: "JavaScript Essentials",
        description:
          "Learn modern JavaScript programming including ES6+ features and async programming.",
        completed: false,
        topics: [
          {
            id: "t4",
            title: "ES6+ Features Deep Dive",
            duration: 55,
            completed: false,
          },
          {
            id: "t5",
            title: "Async Programming with Promises",
            duration: 50,
            completed: false,
          },
          {
            id: "t6",
            title: "Working with APIs",
            duration: 45,
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Data Science Journey",
    description: "From statistics to machine learning",
    progress: 30,
    created: new Date("2024-02-05"),
    lastAccessed: new Date("2024-02-14"),
    aiGenerated: true,
    modules: [
      {
        id: "m3",
        title: "Statistics Fundamentals",
        description:
          "Understanding basic statistical concepts and their applications in data science.",
        completed: true,
        topics: [
          {
            id: "t7",
            title: "Descriptive Statistics",
            duration: 40,
            completed: true,
          },
          {
            id: "t8",
            title: "Probability Distributions",
            duration: 55,
            completed: true,
          },
        ],
      },
      {
        id: "m4",
        title: "Python for Data Science",
        description:
          "Learn essential Python libraries for data analysis including NumPy and Pandas.",
        completed: false,
        topics: [
          {
            id: "t9",
            title: "NumPy Arrays and Operations",
            duration: 45,
            completed: false,
          },
          {
            id: "t10",
            title: "Data Analysis with Pandas",
            duration: 60,
            completed: false,
          },
        ],
      },
    ],
  },
];
