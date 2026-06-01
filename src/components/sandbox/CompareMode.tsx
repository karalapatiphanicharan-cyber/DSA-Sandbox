'use client';

import React, { useState } from 'react';
import { STRUCTURES } from '@/data/structures';
import { StructureType } from '@/types/structures';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StackVisualizer } from '../visualizers/StackVisualizer';
import { QueueVisualizer } from '../visualizers/QueueVisualizer';
import { CircularQueueVisualizer } from '../visualizers/CircularQueueVisualizer';
import { DequeVisualizer } from '../visualizers/DequeVisualizer';
import { PriorityQueueVisualizer } from '../visualizers/PriorityQueueVisualizer';
import { LinkedListVisualizer } from '../visualizers/LinkedListVisualizer';
import { DoublyLinkedListVisualizer } from '../visualizers/DoublyLinkedListVisualizer';
import { CircularLinkedListVisualizer } from '../visualizers/CircularLinkedListVisualizer';
import { BSTVisualizer } from '../visualizers/BSTVisualizer';
import { AVLVisualizer } from '../visualizers/AVLVisualizer';
import { HeapVisualizer } from '../visualizers/HeapVisualizer';
import { TrieVisualizer } from '../visualizers/TrieVisualizer';
import { BinaryTreeVisualizer } from '../visualizers/BinaryTreeVisualizer';
import { RedBlackTreeVisualizer } from '../visualizers/RedBlackTreeVisualizer';

export const CompareMode: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [structA, setStructA] = useState<StructureType>('STACK');
  const [structB, setStructB] = useState<StructureType>('QUEUE');

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <header className="h-20 border-b bg-white dark:bg-slate-900 flex items-center px-8 justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 dark:shadow-none">VS</div>
          <div>
            <h2 className="font-black text-xl tracking-tight text-slate-800 dark:text-slate-100 uppercase">Comparison Lab</h2>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">Side-by-side analysis</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl w-12 h-12 hover:bg-slate-100 dark:hover:bg-slate-800">
          <X size={24} />
        </Button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side */}
        <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-800">
          <div className="p-6 border-b bg-white dark:bg-slate-900 flex items-center justify-between">
            <Select value={structA} onValueChange={(val: string | null) => val && setStructA(val as StructureType)}>
              <SelectTrigger className="w-[240px] h-12 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                {Object.values(STRUCTURES).map((s) => (
                  <SelectItem key={s.id} value={s.id} className="font-bold">{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <ComplexityBadge complexity={STRUCTURES[structA].complexity.time.average} label="AVG" />
              <ComplexityBadge complexity={STRUCTURES[structA].complexity.space} label="SPACE" />
            </div>
          </div>
          <div className="flex-1 relative bg-[#F5F7FB] dark:bg-slate-950/50 p-4">
            <div className="h-full w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-white dark:border-slate-800 overflow-hidden">
              <VisualizationCanvasOverride type={structA} />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b bg-white dark:bg-slate-900 flex items-center justify-between">
            <Select value={structB} onValueChange={(val: string | null) => val && setStructB(val as StructureType)}>
              <SelectTrigger className="w-[240px] h-12 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                {Object.values(STRUCTURES).map((s) => (
                  <SelectItem key={s.id} value={s.id} className="font-bold">{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <ComplexityBadge complexity={STRUCTURES[structB].complexity.time.average} label="AVG" />
              <ComplexityBadge complexity={STRUCTURES[structB].complexity.space} label="SPACE" />
            </div>
          </div>
          <div className="flex-1 relative bg-[#F5F7FB] dark:bg-slate-950/50 p-4">
            <div className="h-full w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-white dark:border-slate-800 overflow-hidden">
              <VisualizationCanvasOverride type={structB} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplexityBadge: React.FC<{ complexity: string; label: string }> = ({ complexity, label }) => (
  <div className="flex flex-col items-end">
    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
    <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400">{complexity}</span>
  </div>
);

const VisualizationCanvasOverride: React.FC<{ type: StructureType }> = ({ type }) => {
  const renderVisualizer = () => {
    switch (type) {
      case 'STACK': return <StackVisualizer />;
      case 'QUEUE': return <QueueVisualizer />;
      case 'CIRCULAR_QUEUE': return <CircularQueueVisualizer />;
      case 'DEQUE': return <DequeVisualizer />;
      case 'PRIORITY_QUEUE': return <PriorityQueueVisualizer />;
      case 'LINKED_LIST': return <LinkedListVisualizer />;
      case 'DOUBLY_LINKED_LIST': return <DoublyLinkedListVisualizer />;
      case 'CIRCULAR_LINKED_LIST': return <CircularLinkedListVisualizer />;
      case 'BINARY_TREE': return <BinaryTreeVisualizer />;
      case 'BINARY_SEARCH_TREE': return <BSTVisualizer />;
      case 'AVL_TREE': return <AVLVisualizer />;
      case 'RED_BLACK_TREE': return <RedBlackTreeVisualizer />;
      case 'HEAP': return <HeapVisualizer />;
      case 'TRIE': return <TrieVisualizer />;
      default: return <StackVisualizer />;
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-slate-50/30 dark:bg-slate-900/30">
      <div className="absolute top-4 right-4 z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-md border shadow-sm">
        {STRUCTURES[type].category}
      </div>
      <div className="h-full w-full flex items-center justify-center">
        {renderVisualizer()}
      </div>
    </div>
  );
};
