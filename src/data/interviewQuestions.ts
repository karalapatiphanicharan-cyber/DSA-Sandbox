export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export const INTERVIEW_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'What is the time complexity of pushing an element onto a stack implemented using an array?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Pushing onto an array-based stack is a constant time operation as it only involves adding an element at the current index and incrementing the pointer.',
    difficulty: 'Beginner',
    category: 'STACKS'
  },
  {
    id: '2',
    text: 'In a circular queue with size N, what is the condition for the queue being full?',
    options: ['front == rear', 'rear == N - 1', '(rear + 1) % N == front', 'front == (rear + 1)'],
    correctAnswer: 2,
    explanation: 'In a circular queue, the full condition is when the next position of rear becomes front.',
    difficulty: 'Intermediate',
    category: 'QUEUES'
  },
  {
    id: '3',
    text: 'What is the height of a balanced AVL tree with n nodes?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'AVL trees are self-balancing BSTs that maintain a height of O(log n).',
    difficulty: 'Intermediate',
    category: 'TREES'
  }
];
