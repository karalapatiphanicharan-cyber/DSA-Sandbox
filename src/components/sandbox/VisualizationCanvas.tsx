'use client';

import React from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
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
               <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 overflow-hidden" />
            ))}
         </div>
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Learners</span>
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
