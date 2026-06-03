import { create } from 'zustand';
import { StructureType, TreeState, ListState, StackItem } from '../types/structures';

export interface HistoryStateSnapshot {
  data: StackItem[];
  treeData: TreeState | null;
  listData: ListState | null;
  currentStructure: StructureType;
  front?: number;
  rear?: number;
  size?: number;
  timestamp: number;
}

interface HistoryState {
  history: HistoryStateSnapshot[];
  currentIndex: number;

  addToHistory: (state: Omit<HistoryStateSnapshot, 'timestamp'>) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  jumpTo: (index: number) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  currentIndex: -1,

  addToHistory: (state) => set((prev) => {
    // If we are in the middle of the timeline and perform a new action,
    // we should truncate the "future" history
    const newHistory = prev.history.slice(0, prev.currentIndex + 1);
    newHistory.push({
      ...state,
      timestamp: Date.now()
    });
    return {
      history: newHistory,
      currentIndex: newHistory.length - 1
    };
  }),

  undo: () => set((state) => ({
    currentIndex: Math.max(0, state.currentIndex - 1)
  })),

  redo: () => set((state) => ({
    currentIndex: Math.min(state.history.length - 1, state.currentIndex + 1)
  })),

  jumpTo: (index) => set((state) => {
    if (index >= 0 && index < state.history.length) {
      return { currentIndex: index };
    }
    return state;
  }),

  clearHistory: () => set({ history: [], currentIndex: -1 }),
}));
