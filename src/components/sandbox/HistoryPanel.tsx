'use client';

import React from 'react';
import { History, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useHistoryStore } from '@/store/historyStore';
import { useSandboxStore } from '@/store/sandboxStore';
import { STRUCTURES } from '@/data/structures';

export const HistoryPanel: React.FC = () => {
  const { history, jumpTo, clearHistory, currentIndex } = useHistoryStore();
  const { setData, setTreeData, setListData, setStructure } = useSandboxStore();

  const handleReplay = (index: number) => {
    const state = history[index];
    setData(state.data);
    setTreeData(state.treeData);
    setListData(state.listData);
    setStructure(state.currentStructure, STRUCTURES[state.currentStructure].category);
    jumpTo(index);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-slate-600">
          <History size={20} />
          <h3 className="font-bold text-lg">Operation History</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearHistory}>
          <RotateCcw size={16} />
        </Button>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-2">
          {history.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm italic">
              No operations recorded yet
            </div>
          )}
          {history.map((state, i) => (
            <div
              key={i}
              onClick={() => handleReplay(i)}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                i === currentIndex
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm'
                : 'bg-white dark:bg-slate-900 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black">
                  #{i + 1}
                </div>
                <div>
                  <div className="text-sm font-bold">{state.currentStructure.replace('_', ' ')} Update</div>
                  <div className="text-[10px] text-slate-400">Step in timeline</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className={`${i === currentIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} h-8 w-8 text-indigo-500`}>
                <Play size={14} fill="currentColor" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
