import { create } from 'zustand';
import { StructureType, Category, TreeState, ListState, StackItem } from '../types/structures';

interface SandboxState {
  currentStructure: StructureType;
  currentCategory: Category;
  data: StackItem[];
  treeData: TreeState | null;
  listData: ListState | null;
  isAnimating: boolean;
  animationSpeed: number;
  maxSize: number;
  front: number;
  rear: number;
  size: number;

  // Actions
  setStructure: (type: StructureType, category: Category) => void;
  setData: (data: StackItem[]) => void;
  setTreeData: (data: TreeState | null) => void;
  setListData: (data: ListState | null) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setMaxSize: (size: number) => void;
  setQueueState: (state: { front: number; rear: number; size: number }) => void;
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
  front: 0,
  rear: -1,
  size: 0,

  setStructure: (type, category) => set((state) => {
    if (state.currentStructure === type) return {};
    return {
      currentStructure: type,
      currentCategory: category,
      data: [],
      treeData: null,
      listData: null,
      front: 0,
      rear: -1,
      size: 0
    };
  }),
  setData: (data) => set({ data }),
  setTreeData: (treeData) => set({ treeData }),
  setListData: (listData) => set({ listData }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
  setMaxSize: (maxSize) => set({ maxSize }),
  setQueueState: (queueState) => set(queueState),
  reset: () => set({ data: [], treeData: null, listData: null, isAnimating: false, front: 0, rear: -1, size: 0 }),
}));
