'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import { useSandboxStore } from '@/store/sandboxStore';

export const DoublyLinkedListVisualizer: React.FC = () => {
  const { listData } = useSandboxStore();

  const nodes = React.useMemo(() => {
    const arr = [];
    let curr = listData;
    while (curr) {
      arr.push(curr);
      curr = curr.next;
    }
    return arr;
  }, [listData]);

  return (
    <div className="relative h-full w-full flex items-center justify-start p-12 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/50 rounded-xl">
      <div className="flex items-center">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-16 flex border-2 border-sky-500 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-md">
                  <div className="w-8 bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-[8px] text-sky-400 font-mono border-r border-sky-500/30">
                    PREV
                  </div>
                  <div className="flex-1 flex items-center justify-center font-bold text-sky-600">
                    {node.value}
                  </div>
                  <div className="w-8 bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-[8px] text-sky-400 font-mono border-l border-sky-500/30">
                    NEXT
                  </div>
                </div>
              </motion.div>

              {index < nodes.length - 1 && (
                <motion.div className="flex items-center justify-center mx-2">
                  <MoveHorizontal className="text-sky-400 w-8 h-8" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
