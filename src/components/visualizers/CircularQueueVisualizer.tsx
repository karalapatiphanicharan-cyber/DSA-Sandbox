'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';

export const CircularQueueVisualizer: React.FC = () => {
  const { data, maxSize } = useSandboxStore();
  const radius = 120;

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-xl">
      <div className="relative w-80 h-80 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center">
        {Array.from({ length: maxSize }).map((_, i) => {
          const angle = (i * 360) / maxSize;
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

          const item = data.find((d) => d.index === i);

          return (
            <div
              key={i}
              className="absolute w-14 h-14 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400 font-mono"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {i}
              <AnimatePresence>
                {item && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 bg-cyan-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
                  >
                    {item.value}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="text-center">
          <div className="text-2xl font-bold text-slate-300">Circular</div>
          <div className="text-sm text-slate-400">Queue</div>
        </div>
      </div>
    </div>
  );
};
