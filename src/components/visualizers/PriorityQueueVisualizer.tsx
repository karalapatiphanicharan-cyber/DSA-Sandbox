'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { StackItem } from '@/types/structures';

export const PriorityQueueVisualizer: React.FC<{ data?: StackItem[] }> = ({ data: propsData }) => {
  const { data: storeData } = useSandboxStore();
  const data = propsData || storeData;
  const sortedData = [...data].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-start p-12 overflow-y-auto bg-[var(--color-slate-50)] dark:bg-slate-950/50">
      <div className="w-full max-w-2xl space-y-4">
        <AnimatePresence mode="popLayout">
          {sortedData.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-amber-500 transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-amber-500 text-white rounded-2xl font-black text-xl shadow-lg shadow-amber-200 dark:shadow-none group-hover:scale-110 transition-transform">
                {item.value}
              </div>
              <div className="ml-6 flex-1">
                <div className="flex items-center space-x-2">
                   <div className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-[8px] font-black text-amber-600 rounded-full uppercase tracking-widest border border-amber-100 dark:border-amber-800">
                     Priority Level
                   </div>
                </div>
                <div className="text-2xl font-black text-slate-700 dark:text-slate-200">{item.priority}</div>
              </div>

              <div className="text-right">
                 <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Index</div>
                 <div className="text-sm font-mono font-bold text-slate-400">#{index}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
           <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}
           </div>
           <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-xs">Queue Empty</p>
        </div>
      )}
    </div>
  );
};
