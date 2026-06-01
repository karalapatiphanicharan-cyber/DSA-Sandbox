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

  // Adaptive spacing based on level to prevent overlap in deep trees
  const spacing = 220 / Math.pow(1.6, level);

  return (
    <motion.g layout>
      {/* Lines to children with premium gradient-like appearance */}
      <AnimatePresence mode="popLayout">
        {node.left && (
          <motion.line
            layout
            key={`line-l-${node.value}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            x1={x} y1={y} x2={x - spacing} y2={y + 100}
            stroke="var(--color-slate-300)"
            strokeWidth="3"
            strokeLinecap="round"
            className="dark:stroke-slate-700"
          />
        )}
        {node.right && (
          <motion.line
            layout
            key={`line-r-${node.value}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            x1={x} y1={y} x2={x + spacing} y2={y + 100}
            stroke="var(--color-slate-300)"
            strokeWidth="3"
            strokeLinecap="round"
            className="dark:stroke-slate-700"
          />
        )}
      </AnimatePresence>

      {/* Node Content */}
      <motion.g
        layout
        key={`node-${node.value}`}
        initial={{ scale: 0, opacity: 0, y: y - 20 }}
        animate={{ scale: 1, opacity: 1, y: y }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        {/* Glow effect for node */}
        <circle
          cx={x}
          cy={y}
          r="32"
          className="fill-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
        />

        <circle
          cx={x}
          cy={y}
          r="30"
          fill="white"
          stroke={node.color === 'red' ? 'var(--color-destructive)' : 'var(--color-primary)'}
          strokeWidth="5"
          className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] dark:fill-slate-800"
        />

        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-black text-lg fill-slate-800 dark:fill-slate-100 select-none"
        >
          {node.value}
        </text>

        {/* Height/Balance Factor Badge */}
        {node.height !== undefined && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transform={`translate(${x + 22}, ${y - 35})`}
          >
             <rect width="24" height="18" rx="6" fill="var(--color-primary)" className="shadow-lg" />
             <text x="12" y="13" textAnchor="middle" className="text-[10px] font-black fill-white">
               {node.height}
             </text>
             <text x="12" y="-5" textAnchor="middle" className="text-[7px] font-black fill-slate-400 uppercase tracking-tighter">Height</text>
          </motion.g>
        )}
      </motion.g>

      <TreeNode node={node.left || null} x={x - spacing} y={y + 100} level={level + 1} />
      <TreeNode node={node.right || null} x={x + spacing} y={y + 100} level={level + 1} />
    </motion.g>
  );
};

export const BSTVisualizer: React.FC = () => {
  const { treeData } = useSandboxStore();

  return (
    <div className="h-full w-full bg-slate-50/50 dark:bg-[var(--color-slate-950)] overflow-auto p-12 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-slate-200)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--color-slate-800)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none opacity-40" />

      <svg width="100%" height="100%" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet" className="relative z-10">
        <defs>
          <linearGradient id="treeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-purple-500)" />
          </linearGradient>
        </defs>

        {treeData ? (
          <AnimatePresence mode="popLayout">
            <TreeNode node={treeData} x={500} y={100} level={0} key="root" />
          </AnimatePresence>
        ) : (
          <g transform="translate(500, 400)">
            <motion.circle
              animate={{ r: [35, 45, 35], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
              r="40"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            <text textAnchor="middle" className="fill-slate-400 font-black uppercase tracking-[0.2em] text-[10px] italic">
              Recursive Root Missing
            </text>
            <text y="20" textAnchor="middle" className="fill-slate-300 font-medium text-[9px]">
              Initialize the tree to begin visualization
            </text>
          </g>
        )}
      </svg>

      {/* Floating Meta Hub */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-8 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border border-white dark:border-white/5 rounded-[2rem] shadow-2xl flex items-center space-x-12">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Structure Type</span>
          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">Binary Search Tree</span>
        </div>
        <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Optimization</span>
          <span className="text-sm font-black text-slate-800 dark:text-white font-mono">O(log n)</span>
        </div>
      </div>
    </div>
  );
};
