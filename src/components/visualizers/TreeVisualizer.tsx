'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '@/store/sandboxStore';
import { TreeState } from '@/types/structures';

interface TreeElement {
    node: TreeState;
    x: number;
    y: number;
}

export const TreeVisualizer: React.FC<{ data?: TreeState | null, structure?: string }> = ({ data: propsData, structure: propsStructure }) => {
  const { treeData: storeData, currentStructure: storeStructure } = useSandboxStore();
  const treeData = propsData !== undefined ? propsData : storeData;
  const currentStructure = propsStructure || storeStructure;

  const getTreeLayout = React.useCallback((node: TreeState | null, x: number, y: number, level: number, offset: number): TreeElement[] => {
    if (!node) return [];

    const elements: TreeElement[] = [];
    const spacing = offset;

    elements.push({ node, x, y });

    if (node.left) {
      elements.push(...getTreeLayout(node.left, x - spacing, y + 80, level + 1, spacing / 1.8));
    }
    if (node.right) {
      elements.push(...getTreeLayout(node.right, x + spacing, y + 80, level + 1, spacing / 1.8));
    }

    return elements;
  }, []);

  const layout = React.useMemo(() => getTreeLayout(treeData, 600, 60, 0, 200), [treeData, getTreeLayout]);

  const renderLines = (node: TreeState | null, x: number, y: number, level: number, offset: number): React.ReactNode[] => {
      if (!node) return [];
      const lines: React.ReactNode[] = [];
      const spacing = offset;

      if (node.left) {
          lines.push(
              <motion.line
                key={`line-l-${node.id}`}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                x1={x} y1={y} x2={x - spacing} y2={y + 80}
                stroke="var(--color-slate-300)" strokeWidth="2"
              />
          );
          lines.push(...renderLines(node.left, x - spacing, y + 80, level + 1, spacing / 1.8));
      }
      if (node.right) {
          lines.push(
            <motion.line
              key={`line-r-${node.id}`}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              x1={x} y1={y} x2={x + spacing} y2={y + 80}
              stroke="var(--color-slate-300)" strokeWidth="2"
            />
        );
        lines.push(...renderLines(node.right, x + spacing, y + 80, level + 1, spacing / 1.8));
      }
      return lines;
  };

  return (
    <div className="h-full w-full bg-slate-50/50 dark:bg-slate-950 overflow-auto p-12 relative">
      <svg width="1200" height="800" viewBox="0 0 1200 800" className="mx-auto">
        <g>
            {treeData && renderLines(treeData, 600, 60, 0, 200)}
        </g>
        <AnimatePresence>
            {layout.map(({ node, x, y }) => (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x, y }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <circle
                      r="25"
                      fill={node.color === 'red' ? 'var(--color-rose-500)' : (node.color === 'black' ? 'var(--color-slate-900)' : 'white')}
                      stroke={node.color === 'red' ? 'var(--color-rose-500)' : (node.color === 'black' ? 'var(--color-slate-800)' : 'var(--color-indigo-500)')}
                      strokeWidth="3"
                      className="drop-shadow-sm"
                    />
                    <text
                      textAnchor="middle"
                      dy=".3em"
                      className={`text-xs font-bold ${node.color ? 'fill-white' : 'fill-slate-800'}`}
                    >
                      {node.value}
                    </text>
                    {node.height !== undefined && (
                        <text x="30" y="-20" className="text-[8px] fill-slate-400 font-bold uppercase">H:{node.height}</text>
                    )}
                </motion.g>
            ))}
        </AnimatePresence>
      </svg>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full border shadow-lg">
          <div className="flex flex-col items-center">
              <span className="text-[8px] font-black text-slate-400 uppercase">Structure</span>
              <span className="text-[10px] font-bold text-indigo-600">{currentStructure}</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex flex-col items-center">
              <span className="text-[8px] font-black text-slate-400 uppercase">Algorithm</span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Recursive Layout</span>
          </div>
      </div>
    </div>
  );
};
