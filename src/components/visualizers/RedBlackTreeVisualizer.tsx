'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { TreeState } from '@/types/structures';

interface TreeNodeProps {
  node: TreeState | null;
  x: number;
  y: number;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, x, y, level }) => {
  if (!node) return null;

  const spacing = 220 / Math.pow(1.6, level);

  return (
    <g>
      <AnimatePresence>
        {node.left && (
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            x1={x} y1={y} x2={x - spacing} y2={y + 100}
            stroke="var(--color-slate-300)"
            strokeWidth="3"
            strokeLinecap="round"
            className="dark:stroke-slate-700"
          />
        )}
        {node.right && (
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            x1={x} y1={y} x2={x + spacing} y2={y + 100}
            stroke="var(--color-slate-300)"
            strokeWidth="3"
            strokeLinecap="round"
            className="dark:stroke-slate-700"
          />
        )}
      </AnimatePresence>

      <motion.g
        initial={{ scale: 0, opacity: 0, y: y - 20 }}
        animate={{ scale: 1, opacity: 1, y: y }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, delay: level * 0.05 }}
      >
        <circle
          cx={x}
          cy={y}
          r="30"
          fill="white"
          stroke={node.color === 'red' ? 'var(--color-destructive)' : 'var(--color-slate-800)'}
          strokeWidth="5"
          className="drop-shadow-lg dark:fill-slate-800"
        />

        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-black text-lg fill-slate-800 dark:fill-slate-100"
        >
          {node.value}
        </text>
      </motion.g>

      <TreeNode node={node.left || null} x={x - spacing} y={y + 100} level={level + 1} />
      <TreeNode node={node.right || null} x={x + spacing} y={y + 100} level={level + 1} />
    </g>
  );
};

export const RedBlackTreeVisualizer: React.FC = () => {
  const { treeData } = useSandboxStore();

  return (
    <div className="h-full w-full bg-slate-50/50 dark:bg-slate-950 overflow-auto p-12">
      <svg width="100%" height="100%" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet">
        {treeData ? (
          <TreeNode node={treeData} x={500} y={100} level={0} />
        ) : (
          <text x="500" y="400" textAnchor="middle" className="fill-slate-400 font-bold uppercase tracking-widest">
            Tree Empty
          </text>
        )}
      </svg>
    </div>
  );
};
