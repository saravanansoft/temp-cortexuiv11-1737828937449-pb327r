// Mock data structure for learning topics
export interface Topic {
  id: string;
  name: string;
  description: string;
  subtopics?: SubTopic[];
}

export interface SubTopic {
  id: string;
  name: string;
  areas?: Area[];
}

export interface Area {
  id: string;
  name: string;
  description: string;
}

export const learningTopics: Topic[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    description:
      "Artificial intelligence (AI) refers to the development of computer systems that can perform tasks typically requiring human intelligence, such as learning, problem-solving, decision-making, and perception, through algorithms and data analysis.",
    subtopics: [
      {
        id: "ml",
        name: "Machine Learning",
        areas: [
          {
            id: "supervised",
            name: "Supervised Learning",
            description: "Learn about classification and regression algorithms",
          },
          {
            id: "unsupervised",
            name: "Unsupervised Learning",
            description: "Explore clustering and dimensionality reduction",
          },
          {
            id: "reinforcement",
            name: "Reinforcement Learning",
            description: "Study decision making and reward systems",
          },
        ],
      },
      {
        id: "dl",
        name: "Deep Learning",
        areas: [
          {
            id: "neural-networks",
            name: "Neural Networks",
            description: "Understanding the fundamentals of neural networks",
          },
          {
            id: "cnn",
            name: "Convolutional Neural Networks",
            description: "Image processing and computer vision",
          },
          {
            id: "nlp",
            name: "Natural Language Processing",
            description: "Text analysis and language understanding",
          },
        ],
      },
    ],
  },
  {
    id: "web-dev",
    name: "Web Development",
    description:
      "Web development refers to the process of designing, building, testing, and maintaining websites and web applications using programming languages, software tools, and technologies such as HTML, CSS, JavaScript, and frameworks like React or Angular.",
    subtopics: [
      {
        id: "frontend",
        name: "Frontend Development",
        areas: [
          {
            id: "react",
            name: "React Development",
            description: "Building modern UIs with React",
          },
          {
            id: "vue",
            name: "Vue.js Development",
            description: "Creating applications with Vue.js",
          },
          {
            id: "angular",
            name: "Angular Development",
            description: "Enterprise applications with Angular",
          },
        ],
      },
      {
        id: "backend",
        name: "Backend Development",
        areas: [
          {
            id: "node",
            name: "Node.js Development",
            description: "Server-side JavaScript with Node.js",
          },
          {
            id: "python",
            name: "Python Backend",
            description: "Backend development with Python",
          },
          {
            id: "java",
            name: "Java Backend",
            description: "Enterprise backend with Java",
          },
        ],
      },
    ],
  },
];
