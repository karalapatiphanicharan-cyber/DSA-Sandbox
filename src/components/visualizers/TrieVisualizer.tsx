'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { TreeState } from '@/types/structures';

interface TrieNodeProps {
  node: TreeState;
  x: number;
  y: number;
  char: string;
  level: number;
}

const TrieNodeComp: React.FC<TrieNodeProps> = ({ node, x, y, char, level }) => {
  const children = node.children ? Object.entries(node.children) : [];
  const spacing = 150 / (level + 1);

  return (
    <g>
      {children.map(([childChar, childNode], i) => {
        const childX = x + (i - (children.length - 1) / 2) * spacing;
        const childY = y + 80;
        return (
          <React.Fragment key={childChar}>
            <line
              x1={x} y1={y} x2={childX} y2={childY}
              stroke="var(--color-slate-300)" strokeWidth="2"
              className="dark:stroke-slate-700"
            />
            <TrieNodeComp
              node={childNode}
              x={childX}
              y={childY}
              char={childChar}
              level={level + 1}
            />
          </React.Fragment>
        );
      })}

      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <circle
          cx={x}
          cy={y}
          r="20"
          fill="white"
          stroke={node.isEndOfWord ? '#22c55e' : 'var(--color-primary)'}
          strokeWidth="3"
          className="drop-shadow-md dark:fill-slate-800"
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-black text-xs fill-slate-800 dark:fill-slate-100"
        >
          {char || 'Root'}
        </text>
      </motion.g>
    </g>
  );
};

export const TrieVisualizer: React.FC = () => {
  const { treeData } = useSandboxStore();

  return (
    <div className="h-full w-full bg-slate-50/50 dark:bg-slate-950 overflow-auto p-12">
      <svg width="100%" height="100%" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet">
        {treeData ? (
          <TrieNodeComp node={treeData} x={500} y={100} char="" level={0} />
        ) : (
          <text x="500" y="400" textAnchor="middle" className="fill-slate-400 font-bold uppercase tracking-widest">
            Trie Empty
          </text>
        )}
      </svg>
    </div>
  );
};
