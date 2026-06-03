'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { StackItem } from '@/types/structures';

export const CircularQueueVisualizer: React.FC<{ data?: StackItem[], maxSize?: number }> = ({ data: propsData, maxSize: propsMaxSize }) => {
  const { data: storeData, maxSize: storeMaxSize, front, rear, size } = useSandboxStore();
  const data = propsData || storeData;
  const maxSize = propsMaxSize || storeMaxSize;
  const radius = 120;

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-xl p-8">
      <div className="mb-8 grid grid-cols-2 gap-8 w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue Status</div>
              <div className="flex justify-between items-end">
                  <div className="text-2xl font-black text-indigo-600">{size} / {maxSize}</div>
                  <div className="text-[10px] font-bold text-slate-400">SIZE / CAP</div>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available Slots</div>
              <div className="flex justify-between items-end">
                  <div className="text-2xl font-black text-emerald-500">{maxSize - size}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Free</div>
              </div>
          </div>
      </div>

      <div className="relative w-80 h-80 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center">
        {Array.from({ length: maxSize }).map((_, i) => {
          const angle = (i * 360) / maxSize;
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

          const item = data[i];
          const isFront = i === front && size > 0;
          const isRear = i === rear && size > 0;

          return (
            <div
              key={i}
              className={`absolute w-14 h-14 rounded-full border-2 ${isFront ? 'border-indigo-500 bg-indigo-50/30' : isRear ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 dark:border-slate-700'} flex items-center justify-center text-xs text-slate-400 font-mono transition-colors duration-500`}
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

              <AnimatePresence>
                {isFront && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute -top-8 text-[9px] font-black text-indigo-600 bg-white px-1.5 py-0.5 rounded shadow-sm border"
                    >
                        FRONT
                    </motion.div>
                )}
                {isRear && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute -bottom-8 text-[9px] font-black text-emerald-600 bg-white px-1.5 py-0.5 rounded shadow-sm border"
                    >
                        REAR
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
