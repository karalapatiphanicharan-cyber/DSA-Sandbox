'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';

export const HeapVisualizer: React.FC = () => {
  const { data } = useSandboxStore();

  const getPosition = (index: number) => {
    const level = Math.floor(Math.log2(index + 1));
    const posInLevel = index - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const spacing = 800 / nodesInLevel;
    const x = (posInLevel + 0.5) * spacing;
    const y = level * 80 + 50;
    return { x, y };
  };

  return (
    <div className="h-full w-full bg-slate-50/50 dark:bg-slate-900/50 rounded-xl overflow-auto p-8">
      <svg width="800" height="600" viewBox="0 0 800 600">
        {data.map((item, index) => {
          const { x, y } = getPosition(index);
          const leftIdx = 2 * index + 1;
          const rightIdx = 2 * index + 2;

          const leftPos = leftIdx < data.length ? getPosition(leftIdx) : null;
          const rightPos = rightIdx < data.length ? getPosition(rightIdx) : null;

          return (
            <g key={item.id}>
              {leftPos && (
                <line x1={x} y1={y} x2={leftPos.x} y2={leftPos.y} stroke="var(--color-slate-400)" strokeWidth="2" />
              )}
              {rightPos && (
                <line x1={x} y1={y} x2={rightPos.x} y2={rightPos.y} stroke="var(--color-slate-400)" strokeWidth="2" />
              )}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                layout
              >
                <circle cx={x} cy={y} r="20" fill="white" stroke="#f59e0b" strokeWidth="3" className="dark:fill-slate-800" />
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="font-bold text-sm dark:fill-slate-200">
                  {item.value}
                </text>
                <text x={x} y={y + 35} textAnchor="middle" className="text-[10px] fill-slate-400">
                  idx:{index}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
