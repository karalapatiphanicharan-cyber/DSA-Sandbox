'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { TreeState } from '@/types/structures';

interface TrieNodeProps {
  node: TreeState;
  x: number;
  y: number;
  level: number;
}

const TrieNode: React.FC<TrieNodeProps> = ({ node, x, y, level }) => {
  const children = Object.entries(node.children || {});
  const spacing = 140 / Math.pow(1.3, level);

  return (
    <motion.g layout>
      {children.map(([, child], i) => {
          const childX = x + (i - (children.length - 1) / 2) * spacing;
          const childY = y + 80;
          return (
              <React.Fragment key={child.id}>
                  <motion.line
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    x1={x} y1={y} x2={childX} y2={childY}
                    stroke="var(--color-slate-200)" strokeWidth="2"
                  />
                  <TrieNode node={child} x={childX} y={childY} level={level + 1} />
              </React.Fragment>
          );
      })}

      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <circle
          cx={x} cy={y} r="20"
          fill={node.isEndOfWord ? 'var(--color-indigo-500)' : 'white'}
          stroke="var(--color-indigo-500)" strokeWidth="2"
        />
        <text
          x={x} y={y} dy=".3em" textAnchor="middle"
          className={`text-[10px] font-black ${node.isEndOfWord ? 'fill-white' : 'fill-slate-600'}`}
        >
          {node.value || 'root'}
        </text>
      </motion.g>
    </motion.g>
  );
};

export const TrieVisualizer: React.FC<{ data?: TreeState | null }> = ({ data: propsData }) => {
  const { treeData: storeData } = useSandboxStore();
  const treeData = propsData !== undefined ? propsData : storeData;

  return (
    <div className="h-full w-full bg-slate-50/50 dark:bg-slate-950 overflow-auto p-12">
      <svg width="1200" height="800" viewBox="0 0 1200 800" className="mx-auto">
        {treeData && <TrieNode node={treeData} x={600} y={50} level={0} />}
      </svg>
    </div>
  );
};
