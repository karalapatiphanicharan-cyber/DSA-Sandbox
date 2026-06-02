'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { StackItem } from '@/types/structures';

export const DequeVisualizer: React.FC<{ data?: StackItem[] }> = ({ data: propsData }) => {
  const { data: storeData } = useSandboxStore();
  const data = propsData || storeData;

  return (
    <div className="relative h-full w-full flex items-center justify-center p-12 bg-[var(--color-slate-50)] dark:bg-slate-950/50 rounded-xl overflow-x-auto">
      <div className="flex items-center space-x-6 min-w-max">
        <AnimatePresence mode="popLayout">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="relative w-28 h-28 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-[32px] shadow-2xl shadow-blue-500/10 group"
            >
              <div className="absolute inset-2 border border-blue-100 dark:border-blue-900/30 rounded-[24px]" />
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400 z-10">{item.value}</span>

              {index === 0 && (
                <div className="absolute -top-12 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-200 dark:border-blue-800">
                  HEAD
                </div>
              )}
              {index === data.length - 1 && (
                <div className="absolute -bottom-12 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-200 dark:border-blue-800">
                  TAIL
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.length === 0 && (
        <div className="flex flex-col items-center space-y-4">
           <div className="w-32 h-32 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-full animate-spin-slow" />
           <p className="text-slate-300 font-black uppercase tracking-[0.2em] text-xs">Waiting for Data</p>
        </div>
      )}
    </div>
  );
};
