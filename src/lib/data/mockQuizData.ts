export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    moduleId: 'm1',
    title: 'HTML & CSS Foundations Quiz',
    description: 'Test your knowledge of HTML5 and CSS3 fundamentals',
    questions: [
      {
        id: '1',
        text: 'Which HTML5 element is used to define important text?',
        options: [
          { id: 'a', text: '<strong>' },
          { id: 'b', text: '<b>' },
          { id: 'c', text: '<important>' },
          { id: 'd', text: '<em>' }
        ],
        correctAnswer: 'a'
      },
      {
        id: '2',
        text: 'What is the correct CSS syntax for making all the <p> elements bold?',
        options: [
          { id: 'a', text: 'p { font-weight: bold; }' },
          { id: 'b', text: 'p { text-weight: bold; }' },
          { id: 'c', text: '<p style="font-size: bold;">' },
          { id: 'd', text: 'p { font: bold; }' }
        ],
        correctAnswer: 'a'
      },
      {
        id: '3',
        text: 'Which property is used to change the background color?',
        options: [
          { id: 'a', text: 'color' },
          { id: 'b', text: 'bgcolor' },
          { id: 'c', text: 'background-color' },
          { id: 'd', text: 'bg-color' }
        ],
        correctAnswer: 'c'
      },
      {
        id: '4',
        text: 'What does CSS stand for?',
        options: [
          { id: 'a', text: 'Creative Style Sheets' },
          { id: 'b', text: 'Cascading Style Sheets' },
          { id: 'c', text: 'Computer Style Sheets' },
          { id: 'd', text: 'Colorful Style Sheets' }
        ],
        correctAnswer: 'b'
      },
      {
        id: '5',
        text: 'Which HTML attribute is used to define inline styles?',
        options: [
          { id: 'a', text: 'styles' },
          { id: 'b', text: 'css' },
          { id: 'c', text: 'style' },
          { id: 'd', text: 'class' }
        ],
        correctAnswer: 'c'
      },
      {
        id: '6',
        text: 'What is the default value of the position property?',
        options: [
          { id: 'a', text: 'relative' },
          { id: 'b', text: 'fixed' },
          { id: 'c', text: 'absolute' },
          { id: 'd', text: 'static' }
        ],
        correctAnswer: 'd'
      },
      {
        id: '7',
        text: 'How do you make a list that lists its items with squares?',
        options: [
          { id: 'a', text: 'list-type: square' },
          { id: 'b', text: 'list-style-type: square' },
          { id: 'c', text: 'type: square' },
          { id: 'd', text: 'list: square' }
        ],
        correctAnswer: 'b'
      },
      {
        id: '8',
        text: 'Which CSS property controls the text size?',
        options: [
          { id: 'a', text: 'text-size' },
          { id: 'b', text: 'font-style' },
          { id: 'c', text: 'text-style' },
          { id: 'd', text: 'font-size' }
        ],
        correctAnswer: 'd'
      },
      {
        id: '9',
        text: 'What is the correct HTML for creating a hyperlink?',
        options: [
          { id: 'a', text: '<a url="http://example.com">Link</a>' },
          { id: 'b', text: '<a href="http://example.com">Link</a>' },
          { id: 'c', text: '<link href="http://example.com">Link</link>' },
          { id: 'd', text: '<hyperlink>http://example.com</hyperlink>' }
        ],
        correctAnswer: 'b'
      },
      {
        id: '10',
        text: 'Which property is used to change the font of an element?',
        options: [
          { id: 'a', text: 'font-family' },
          { id: 'b', text: 'font-style' },
          { id: 'c', text: 'font-type' },
          { id: 'd', text: 'font-weight' }
        ],
        correctAnswer: 'a'
      }
    ]
  }
];