import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB_NAME || 'campustwin';

if (!mongoUri) {
  console.error('Missing MONGODB_URI environment variable in your .env or .env.local file.');
  process.exit(1);
}

const sampleQuestions = [
  {
    id: 'q1',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which HTML element is used for the largest heading?',
    options: ['<h6>', '<heading>', '<h1>', '<head>'],
    correctAnswer: '<h1>'
  },
  {
    id: 'q2',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What does CSS stand for?',
    options: [
      'Creative Style Sheets',
      'Cascading Style Sheets',
      'Computer Style Sheets',
      'Colorful Style Sheets'
    ],
    correctAnswer: 'Cascading Style Sheets'
  },
  {
    id: 'q3',
    type: 'mcq',
    difficulty: 'medium',
    question: 'Which of the following is NOT a JavaScript data type?',
    options: ['Undefined', 'Number', 'Boolean', 'Float'],
    correctAnswer: 'Float'
  },
  {
    id: 'q4',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the correct way to declare a React state variable?',
    options: [
      'const [state, setState] = useState(init)',
      'let state = new State(init)',
      'const state = React.state(init)',
      'state = useState(init)'
    ],
    correctAnswer: 'const [state, setState] = useState(init)'
  },
  {
    id: 'q5',
    type: 'mcq',
    difficulty: 'hard',
    question: 'What is the time complexity of searching in a balanced Binary Search Tree?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 'O(log n)'
  },
  {
    id: 'q6',
    type: 'coding',
    difficulty: 'medium',
    question: 'Write a JavaScript function "sumArray(arr)" that returns the sum of all numbers in an array. Example: sumArray([1, 2, 3]) should return 6.',
    starterCode: 'function sumArray(arr) {\n  // Write your code here\n}',
    testCase: {
      input: '[1, 2, 3, 4]',
      expected: '10'
    }
  }
];

async function seed() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully.');
    const db = client.db(dbName);
    const questionsCollection = db.collection('questions');

    // Clear existing questions
    const deleteRes = await questionsCollection.deleteMany({});
    console.log(`Cleared ${deleteRes.deletedCount} existing questions.`);

    // Insert sample questions
    const insertRes = await questionsCollection.insertMany(sampleQuestions);
    console.log(`Successfully seeded ${insertRes.insertedCount} adaptive questions.`);
  } catch (err) {
    console.error('Seeding operation failed:', err);
  } finally {
    await client.close();
  }
}

seed();
