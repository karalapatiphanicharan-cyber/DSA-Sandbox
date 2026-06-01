'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Box } from 'lucide-react';
import { useSandboxStore } from '@/store/sandboxStore';

export const LinkedListVisualizer: React.FC = () => {
  const { listData } = useSandboxStore();

  // Convert linked list to array for easier mapping with Framer Motion
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
    <div className="relative h-full w-full flex items-center justify-start p-16 overflow-x-auto bg-[var(--color-slate-50)] dark:bg-slate-950/50">
      <div className="flex items-center min-w-max pr-32">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <motion.div
                layout
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.5 }}
                className="flex flex-col items-center relative"
              >
                {index === 0 && (
                  <div className="absolute -top-10 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-emerald-200 dark:shadow-none animate-bounce">
                    HEAD
                  </div>
                )}

                <div className="flex items-stretch h-20 w-40 bg-white dark:bg-slate-800 border-2 border-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/5 overflow-hidden group">
                   <div className="flex-1 flex flex-col items-center justify-center border-r-2 border-emerald-500/20">
                      <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase mb-1">Value</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{node.value}</span>
                   </div>
                   <div className="w-12 bg-emerald-500/5 dark:bg-emerald-500/10 flex flex-col items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                      <span className="text-[8px] font-black text-emerald-500/50 uppercase mb-1 rotate-90">Next</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                   </div>
                </div>

                <div className="mt-3 font-mono text-[9px] font-bold text-slate-400">
                  ptr: <span className="text-emerald-500">0x{node.id.slice(0, 4).toUpperCase()}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 60, opacity: 1 }}
                className="flex items-center justify-center -mx-2"
              >
                <div className="w-full h-0.5 bg-emerald-500/30 relative">
                  <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" strokeWidth={3} />
                </div>
              </motion.div>

              {index === nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center ml-2"
                >
                  <div className="w-16 h-10 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center">
                    <span className="text-[10px] font-black text-slate-400">NULL</span>
                  </div>
                  <div className="mt-3 text-[9px] font-black text-slate-300 uppercase">TAIL</div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>

        {nodes.length === 0 && (
          <div className="h-32 w-full flex flex-col items-center justify-center space-y-4 px-20">
            <Box size={40} className="text-slate-200" />
            <div className="text-slate-300 font-black uppercase tracking-widest text-sm text-center">
              Linked List Empty
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
