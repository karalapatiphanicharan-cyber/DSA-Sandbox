import { StructureType, DataStructure } from '../types/structures';

export const STRUCTURES: Record<StructureType, DataStructure> = {
  STACK: {
    id: 'STACK',
    name: 'Stack',
    category: 'STACKS',
    description: 'A linear data structure that follows the Last-In-First-Out (LIFO) principle.',
    operations: [
      { name: 'Push', description: 'Add an element to the top', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Pop', description: 'Remove the top element', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Peek', description: 'View the top element', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Undo/Redo systems', 'Browser history', 'Function call stack'],
    advantages: ['Simple to implement', 'Efficient O(1) operations'],
    disadvantages: ['No random access', 'Fixed size in some implementations'],
    complexity: {
      time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      space: 'O(n)'
    }
  },
  QUEUE: {
    id: 'QUEUE',
    name: 'Queue',
    category: 'QUEUES',
    description: 'A linear data structure that follows the First-In-First-Out (FIFO) principle.',
    operations: [
      { name: 'Enqueue', description: 'Add an element to the rear', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Dequeue', description: 'Remove the front element', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Peek', description: 'View the front element', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Task scheduling', 'Print spooling', 'Message queues'],
    advantages: ['Fair ordering', 'Efficient O(1) operations'],
    disadvantages: ['No random access', 'Inefficient searching'],
    complexity: {
      time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      space: 'O(n)'
    }
  },
  CIRCULAR_QUEUE: {
    id: 'CIRCULAR_QUEUE',
    name: 'Circular Queue',
    category: 'QUEUES',
    description: 'A queue where the last position is connected back to the first position.',
    operations: [
      { name: 'Enqueue', description: 'Add an element', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Dequeue', description: 'Remove an element', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Memory management', 'Traffic system buffers', 'CPU scheduling'],
    advantages: ['Optimal space utilization', 'No data shifting required'],
    disadvantages: ['Complex implementation than simple queue'],
    complexity: {
      time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      space: 'O(n)'
    }
  },
  DEQUE: {
    id: 'DEQUE',
    name: 'Deque',
    category: 'QUEUES',
    description: 'A double-ended queue where elements can be added/removed from both ends.',
    operations: [
      { name: 'Insert Front', description: 'Add to front', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Insert Rear', description: 'Add to rear', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Delete Front', description: 'Remove from front', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Delete Rear', description: 'Remove from rear', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['A-Steal algorithm', 'Palindrome checker', 'Browser history with limit'],
    advantages: ['Versatile', 'Supports both Stack and Queue operations'],
    disadvantages: ['Slightly higher memory overhead'],
    complexity: {
      time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      space: 'O(n)'
    }
  },
  PRIORITY_QUEUE: {
    id: 'PRIORITY_QUEUE',
    name: 'Priority Queue',
    category: 'QUEUES',
    description: 'A queue where elements have priorities and high-priority elements are served first.',
    operations: [
      { name: 'Insert', description: 'Add element with priority', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)' },
      { name: 'Delete Max/Min', description: 'Remove highest priority', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Dijkstra\'s algorithm', 'Huffman coding', 'Operating system scheduling'],
    advantages: ['Efficient access to highest priority item'],
    disadvantages: ['Higher complexity than basic queue'],
    complexity: {
      time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(n)'
    }
  },
  LINKED_LIST: {
    id: 'LINKED_LIST',
    name: 'Singly Linked List',
    category: 'LINKED_LISTS',
    description: 'A linear data structure where elements are stored in nodes, and each node points to the next.',
    operations: [
      { name: 'Insert Beginning', description: 'Add node at start', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Insert End', description: 'Add node at end', timeComplexity: 'O(n)', spaceComplexity: 'O(1)' },
      { name: 'Search', description: 'Find a value', timeComplexity: 'O(n)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Image viewer', 'Music player playlists', 'Adjacency list for graphs'],
    advantages: ['Dynamic size', 'Efficient insertion/deletion'],
    disadvantages: ['No random access', 'Extra memory for pointers'],
    complexity: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(n)'
    }
  },
  DOUBLY_LINKED_LIST: {
    id: 'DOUBLY_LINKED_LIST',
    name: 'Doubly Linked List',
    category: 'LINKED_LISTS',
    description: 'A linked list where each node has pointers to both next and previous nodes.',
    operations: [
      { name: 'Insert', description: 'Add node', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
      { name: 'Delete', description: 'Remove node', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Browser forward/back buttons', 'LRU Cache', 'Text editor undo/redo'],
    advantages: ['Can be traversed in both directions'],
    disadvantages: ['More memory per node', 'More complex pointer management'],
    complexity: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(n)'
    }
  },
  CIRCULAR_LINKED_LIST: {
    id: 'CIRCULAR_LINKED_LIST',
    name: 'Circular Linked List',
    category: 'LINKED_LISTS',
    description: 'A linked list where the last node points back to the first node.',
    operations: [
      { name: 'Traverse', description: 'Visit all nodes', timeComplexity: 'O(n)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Multiplayer game turn management', 'Operating system resource scheduling'],
    advantages: ['Can traverse the entire list from any node'],
    disadvantages: ['Risk of infinite loops if not handled carefully'],
    complexity: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(n)'
    }
  },
  BINARY_TREE: {
    id: 'BINARY_TREE',
    name: 'Binary Tree',
    category: 'TREES',
    description: 'A hierarchical structure where each node has at most two children.',
    operations: [
      { name: 'Traverse', description: 'In-order, Pre-order, Post-order', timeComplexity: 'O(n)', spaceComplexity: 'O(h)' },
    ],
    realWorldUses: ['Expression parsing', 'File systems', 'Hierarchical data storage'],
    advantages: ['Efficient hierarchical representation'],
    disadvantages: ['Can become skewed (O(n) search)'],
    complexity: {
      time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      space: 'O(n)'
    }
  },
  BINARY_SEARCH_TREE: {
    id: 'BINARY_SEARCH_TREE',
    name: 'Binary Search Tree',
    category: 'TREES',
    description: 'A binary tree where left child < parent and right child > parent.',
    operations: [
      { name: 'Insert', description: 'Add a value', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)' },
      { name: 'Search', description: 'Find a value', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)' },
      { name: 'Delete', description: 'Remove a value', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Symbol tables', 'Sets and Maps implementation', 'Database indexing'],
    advantages: ['Efficient search and sort'],
    disadvantages: ['Can become unbalanced'],
    complexity: {
      time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      space: 'O(n)'
    }
  },
  AVL_TREE: {
    id: 'AVL_TREE',
    name: 'AVL Tree',
    category: 'TREES',
    description: 'A self-balancing Binary Search Tree where height difference of children is at most 1.',
    operations: [
      { name: 'Rotate', description: 'Balance the tree', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Database applications where lookups are frequent'],
    advantages: ['Guaranteed O(log n) search'],
    disadvantages: ['Insertion and deletion are slower due to rebalancing'],
    complexity: {
      time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(n)'
    }
  },
  RED_BLACK_TREE: {
    id: 'RED_BLACK_TREE',
    name: 'Red-Black Tree',
    category: 'TREES',
    description: 'A self-balancing BST with an extra bit for node color (red/black) to ensure balance.',
    operations: [],
    realWorldUses: ['Java TreeMap/TreeSet', 'C++ STL Map/Set', 'Linux kernel scheduling'],
    advantages: ['Faster insertion/deletion than AVL'],
    disadvantages: ['Slightly slower search than AVL'],
    complexity: {
      time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(n)'
    }
  },
  HEAP: {
    id: 'HEAP',
    name: 'Heap (Max/Min)',
    category: 'TREES',
    description: 'A complete binary tree that satisfies the heap property.',
    operations: [
      { name: 'Heapify', description: 'Maintain heap property', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Priority queues', 'Heapsort', 'Graph algorithms'],
    advantages: ['Constant time access to min/max'],
    disadvantages: ['Searching is O(n)'],
    complexity: {
      time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(n)'
    }
  },
  TRIE: {
    id: 'TRIE',
    name: 'Trie (Prefix Tree)',
    category: 'TREES',
    description: 'A tree-like structure used for efficient retrieval of keys in a large dataset of strings.',
    operations: [
      { name: 'Insert', description: 'Add a word', timeComplexity: 'O(L)', spaceComplexity: 'O(L)' },
      { name: 'Search', description: 'Find a word', timeComplexity: 'O(L)', spaceComplexity: 'O(1)' },
    ],
    realWorldUses: ['Autocomplete systems', 'Spell checkers', 'IP routing'],
    advantages: ['Fastest string search', 'Prefix-based searching'],
    disadvantages: ['High memory consumption'],
    complexity: {
      time: { best: 'O(L)', average: 'O(L)', worst: 'O(L)' },
      space: 'O(Alphabet_Size * L * N)'
    }
  },
};
