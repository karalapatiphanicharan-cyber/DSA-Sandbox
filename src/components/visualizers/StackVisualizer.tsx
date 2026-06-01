'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';

export const StackVisualizer: React.FC = () => {
  const { data, maxSize } = useSandboxStore();

  return (
    <div className="relative h-full w-full flex flex-col-reverse items-center justify-start p-12 overflow-y-auto bg-[var(--color-slate-50)] dark:bg-slate-950/50">
      <AnimatePresence mode="popLayout">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: -100, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 200, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-64 h-16 mb-3 flex items-center justify-center bg-white dark:bg-slate-800 border-2 border-indigo-500 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 z-10">{item.value}</span>

            {index === data.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-4 flex items-center"
              >
                <div className="px-2 py-0.5 bg-indigo-600 text-[8px] font-black text-white rounded uppercase tracking-tighter">TOP</div>
              </motion.div>
            )}

            <div className="absolute right-4 text-[10px] font-black text-slate-300 dark:text-slate-600 font-mono">
              0x{index.toString(16).toUpperCase()}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full flex flex-col items-center justify-center space-y-4"
        >
          <div className="w-64 h-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-sm">
            Stack is Empty
          </div>
          <p className="text-xs text-slate-400 font-medium italic">Push an element to begin</p>
        </motion.div>
      )}

      {/* Modern Stack Base */}
      <div className="relative mt-8">
        <div className="w-80 h-3 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-1 bg-slate-300 dark:bg-slate-700 rounded-full blur-[1px]" />
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end space-y-1">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memory Usage</div>
        <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500"
            animate={{ width: `${(data.length / maxSize) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
