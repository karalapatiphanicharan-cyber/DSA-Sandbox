'use client';

import React from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { StackVisualizer } from '../visualizers/StackVisualizer';
import { QueueVisualizer } from '../visualizers/QueueVisualizer';
import { CircularQueueVisualizer } from '../visualizers/CircularQueueVisualizer';
import { DequeVisualizer } from '../visualizers/DequeVisualizer';
import { PriorityQueueVisualizer } from '../visualizers/PriorityQueueVisualizer';
import { LinkedListVisualizer } from '../visualizers/LinkedListVisualizer';
import { TrieVisualizer } from '../visualizers/TrieVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

export const VisualizationCanvas: React.FC = () => {
  const { currentStructure } = useSandboxStore();

  const renderVisualizer = () => {
    switch (currentStructure) {
      case 'STACK': return <StackVisualizer />;
      case 'QUEUE': return <QueueVisualizer />;
      case 'CIRCULAR_QUEUE': return <CircularQueueVisualizer />;
      case 'DEQUE': return <DequeVisualizer />;
      case 'PRIORITY_QUEUE': return <PriorityQueueVisualizer />;
      case 'LINKED_LIST':
      case 'DOUBLY_LINKED_LIST':
      case 'CIRCULAR_LINKED_LIST':
          return <LinkedListVisualizer />;
      case 'BINARY_TREE':
      case 'BINARY_SEARCH_TREE':
      case 'AVL_TREE':
      case 'RED_BLACK_TREE':
      case 'HEAP':
          return <TreeVisualizer />;
      case 'TRIE': return <TrieVisualizer />;
      default: return <StackVisualizer />;
    }
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-8 left-8 z-10">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={currentStructure}
            className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 dark:shadow-none border border-indigo-500"
        >
          {currentStructure.replace(/_/g, ' ')}
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 z-10 flex items-center space-x-2">
         <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
               <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center overflow-hidden text-[8px] font-bold text-white ${i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-purple-500' : 'bg-cyan-500'}`}>
                 {String.fromCharCode(64 + i)}
               </div>
            ))}
         </div>
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Sandbox</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStructure}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          {renderVisualizer()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
