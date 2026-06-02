import { create } from 'zustand';
import { StructureType, Category, TreeState, ListState, StackItem } from '../types/structures';

interface SandboxState {
  currentStructure: StructureType;
  currentCategory: Category;
  data: StackItem[]; // Used for stacks/queues
  treeData: TreeState | null; // Used for trees
  listData: ListState | null; // Used for linked lists
  isAnimating: boolean;
  animationSpeed: number;
  maxSize: number;

  // Actions
  setStructure: (type: StructureType, category: Category) => void;
  setData: (data: StackItem[]) => void;
  setTreeData: (data: TreeState | null) => void;
  setListData: (data: ListState | null) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setMaxSize: (size: number) => void;
  reset: () => void;
}

export const useSandboxStore = create<SandboxState>((set) => ({
  currentStructure: 'STACK',
  currentCategory: 'STACKS',
  data: [],
  treeData: null,
  listData: null,
  isAnimating: false,
  animationSpeed: 500,
  maxSize: 10,

  setStructure: (type, category) => set((state) => {
    if (state.currentStructure === type) return {};
    return {
      currentStructure: type,
      currentCategory: category,
      data: [],
      treeData: null,
      listData: null
    };
  }),
  setData: (data) => set({ data }),
  setTreeData: (treeData) => set({ treeData }),
  setListData: (listData) => set({ listData }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
  setMaxSize: (maxSize) => set({ maxSize }),
  reset: () => set({ data: [], treeData: null, listData: null, isAnimating: false }),
}));
