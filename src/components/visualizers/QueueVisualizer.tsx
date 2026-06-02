'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { StackItem } from '@/types/structures';

export const QueueVisualizer: React.FC<{ data?: StackItem[] }> = ({ data: propsData }) => {
  const { data: storeData } = useSandboxStore();
  const data = propsData || storeData;

  return (
    <div className="relative h-full w-full flex items-center justify-start p-16 overflow-x-auto bg-[var(--color-slate-50)] dark:bg-slate-950/50">
      <div className="flex items-center space-x-6 min-w-max pr-24">
        <AnimatePresence mode="popLayout">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: 100, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -80, scale: 0.5, rotate: -15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-24 h-24 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border-2 border-violet-500 rounded-3xl shadow-[0_10px_40px_rgb(139,92,246,0.1)] group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-[8px] font-black text-slate-500 rounded uppercase tracking-tighter">
                {index}
              </div>

              <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{item.value}</span>

              {index === 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-12 text-[10px] font-black text-violet-500 flex flex-col items-center"
                >
                  <span className="mb-1">FRONT</span>
                  <div className="w-1 h-3 bg-violet-400 rounded-full" />
                </motion.div>
              )}
              {index === data.length - 1 && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -bottom-12 text-[10px] font-black text-violet-500 flex flex-col items-center"
                >
                  <div className="w-1 h-3 bg-violet-400 rounded-full mb-1" />
                  <span>REAR</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {data.length === 0 && (
          <div className="h-24 w-full flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] px-12 text-slate-300 font-bold uppercase tracking-widest text-sm italic">
            Queue is Empty
          </div>
        )}
      </div>

      {/* Visual Lane */}
      <div className="absolute left-0 right-0 h-32 bg-slate-200/20 dark:bg-slate-800/20 -z-10" />
    </div>
  );
};
