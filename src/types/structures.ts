export type StructureType =
  | 'STACK'
  | 'QUEUE'
  | 'CIRCULAR_QUEUE'
  | 'DEQUE'
  | 'PRIORITY_QUEUE'
  | 'LINKED_LIST'
  | 'DOUBLY_LINKED_LIST'
  | 'CIRCULAR_LINKED_LIST'
  | 'BINARY_TREE'
  | 'BINARY_SEARCH_TREE'
  | 'AVL_TREE'
  | 'RED_BLACK_TREE'
  | 'HEAP'
  | 'TRIE';

export type Category = 'STACKS' | 'QUEUES' | 'LINKED_LISTS' | 'TREES';

export interface DataStructure {
  id: StructureType;
  name: string;
  category: Category;
  description: string;
  operations: Operation[];
  realWorldUses: string[];
  advantages: string[];
  disadvantages: string[];
  complexity: ComplexityInfo;
}

export interface Operation {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ComplexityInfo {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface TreeState {
  id: string;
  value: number | string;
  left?: TreeState | null;
  right?: TreeState | null;
  parent?: TreeState | null;
  height?: number;
  color?: 'red' | 'black';
  isEndOfWord?: boolean;
  children?: Record<string, TreeState>;
}

export interface ListState {
  id: string;
  value: string | number;
  next: ListState | null;
  prev?: ListState | null;
}

export interface StackItem {
  id: string;
  value: string | number;
  priority?: number;
  index: number;
}
