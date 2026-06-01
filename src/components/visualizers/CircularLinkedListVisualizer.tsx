'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';

export const CircularLinkedListVisualizer: React.FC = () => {
  const { listData } = useSandboxStore();
  const radius = 150;

  const nodes = React.useMemo(() => {
    const arr = [];
    let curr = listData;
    const visited = new Set();
    while (curr && !visited.has(curr.id)) {
      arr.push(curr);
      visited.add(curr.id);
      curr = curr.next;
    }
    return arr;
  }, [listData]);

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-xl">
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        {nodes.map((node, index) => {
          const angle = (index * 360) / nodes.length;
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              className="absolute w-20 h-20 bg-white dark:bg-slate-800 border-2 border-teal-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <div className="text-center">
                <div className="font-bold text-teal-600">{node.value}</div>
                <div className="text-[8px] text-slate-400">@{node.id.slice(0, 4)}</div>
              </div>

              {/* Simple arrow representation to next node */}
              <div
                className="absolute w-12 h-[2px] bg-teal-300 -right-12 origin-left"
                style={{ transform: `rotate(${(360 / nodes.length) / 2}deg)` }}
              />
            </motion.div>
          );
        })}

        {nodes.length > 0 && (
          <div className="absolute inset-0 border-4 border-dashed border-teal-100 dark:border-teal-900/30 rounded-full -z-10" />
        )}
      </div>
    </div>
  );
};
