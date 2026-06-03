'use client';

import React, { useRef } from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { useHistoryStore } from '@/store/historyStore';
import { Play, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export const TimelineSlider: React.FC = () => {
  const { history, currentIndex, jumpTo, undo, redo, clearHistory } = useHistoryStore();
  const { setData, setTreeData, setListData, setStructure, setQueueState } = useSandboxStore();
  const playRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (currentIndex >= 0 && history[currentIndex]) {
      const state = history[currentIndex];
      setData(state.data);
      setTreeData(state.treeData);
      setListData(state.listData);
      if (state.front !== undefined) {
          setQueueState({ front: state.front, rear: state.rear!, size: state.size! });
      }
      setStructure(state.currentStructure, state.currentStructure.includes('TREE') ? 'TREES' : state.currentStructure.includes('LIST') ? 'LINKED_LISTS' : 'STACKS');
    }
  }, [currentIndex, history, setData, setTreeData, setListData, setStructure, setQueueState]);

  const togglePlay = () => {
    if (isPlaying) {
      if (playRef.current) clearInterval(playRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playRef.current = setInterval(() => {
        redo();
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (currentIndex === history.length - 1 && isPlaying) {
      if (playRef.current) clearInterval(playRef.current);
      // Move setState out of effect cycle to avoid React Hook warning
      const timer = setTimeout(() => setIsPlaying(false), 0);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, history.length, isPlaying]);

  return (
    <div className="flex items-center space-x-6 h-full px-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={undo} disabled={currentIndex <= 0}>
          <ChevronLeft size={20} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg transition-all ${isPlaying ? 'bg-indigo-600 text-white scale-110' : ''}`}
          onClick={togglePlay}
        >
          <Play size={20} fill={isPlaying ? "white" : "none"} />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={redo} disabled={currentIndex >= history.length - 1}>
          <ChevronRight size={20} />
        </Button>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time Travel Debugger</span>
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
            Step {currentIndex + 1} of {history.length || 0}
          </span>
        </div>
        <Slider
          value={[currentIndex]}
          max={Math.max(0, history.length - 1)}
          min={0}
          step={1}
          onValueChange={(val) => Array.isArray(val) && jumpTo(val[0])}
          className="cursor-pointer"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={clearHistory}
        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
      >
        <RotateCcw size={14} className="mr-2" /> Reset Timeline
      </Button>
    </div>
  );
};
