'use client';

import React from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { STRUCTURES } from '@/data/structures';
import { BarChart3, Clock, Box, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { TreeState, ListState } from '@/types/structures';

const MetricCard: React.FC<{ label: string; value: string | number; color: string }> = ({ label, value }) => (
  <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800`}>
    <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">{label}</div>
    <div className={`text-sm font-black text-slate-700 dark:text-slate-200`}>{value}</div>
  </div>
);

export const ComplexityPanel: React.FC = () => {
  const { currentStructure, data, treeData, listData, size, maxSize, front, rear } = useSandboxStore();
  const info = STRUCTURES[currentStructure];

  const getTreeMetrics = (node: TreeState | null): { count: number; height: number; blackHeight: number } => {
    if (!node) return { count: 0, height: 0, blackHeight: 1 };
    const left = getTreeMetrics(node.left || null);
    const right = getTreeMetrics(node.right || null);
    const bh = node.color === 'black' ? 1 + Math.max(left.blackHeight, right.blackHeight) : Math.max(left.blackHeight, right.blackHeight);
    return {
      count: 1 + left.count + right.count,
      height: 1 + Math.max(left.height, right.height),
      blackHeight: bh
    };
  };

  const getListMetrics = (head: ListState | null): number => {
    let count = 0;
    let curr = head;
    const visited = new Set();
    while (curr && !visited.has(curr.id)) {
        count++;
        visited.add(curr.id);
        curr = curr.next;
    }
    return count;
  };

  const renderMetrics = () => {
    if (currentStructure === 'CIRCULAR_QUEUE') {
      return (
        <div className="grid grid-cols-2 gap-2 mb-6">
          <MetricCard label="Size" value={size} color="indigo" />
          <MetricCard label="Capacity" value={maxSize} color="slate" />
          <MetricCard label="Available" value={maxSize - size} color="emerald" />
          <MetricCard label="Front / Rear" value={`${front} / ${rear === -1 ? 'X' : rear}`} color="amber" />
        </div>
      );
    }
    if (currentStructure.includes('TREE') || currentStructure === 'HEAP' || currentStructure === 'TRIE') {
        const metrics = getTreeMetrics(treeData);
        const isBalanced = (node: TreeState | null): boolean => {
            if (!node) return true;
            const lh = getTreeMetrics(node.left || null).height;
            const rh = getTreeMetrics(node.right || null).height;
            return Math.abs(lh - rh) <= 1 && isBalanced(node.left || null) && isBalanced(node.right || null);
        };
        const balanced = isBalanced(treeData);

        return (
            <div className="grid grid-cols-2 gap-2 mb-6">
                <MetricCard label="Nodes" value={metrics.count} color="indigo" />
                <MetricCard label="Height" value={metrics.height} color="purple" />
                {currentStructure === 'AVL_TREE' && <MetricCard label="Balanced" value={balanced ? "Yes" : "No"} color={balanced ? "emerald" : "rose"} />}
                {currentStructure === 'RED_BLACK_TREE' && <MetricCard label="Black H" value={metrics.blackHeight} color="slate" />}
            </div>
        );
    }
    const currentSize = currentStructure.includes('LINKED_LIST') ? getListMetrics(listData) : data.length;
    return (
        <div className="grid grid-cols-2 gap-2 mb-6">
            <MetricCard label={currentStructure.includes('LINKED_LIST') ? "Nodes" : "Size"} value={currentSize} color="indigo" />
            <MetricCard label="Capacity" value={maxSize} color="slate" />
        </div>
    );
  };

  const complexityItems = [
    { label: 'Best Case', value: info.complexity.time.best, color: 'text-emerald-500' },
    { label: 'Average', value: info.complexity.time.average, color: 'text-amber-500' },
    { label: 'Worst Case', value: info.complexity.time.worst, color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
          <Activity size={14} className="mr-2" /> Real-time State
        </h4>
        {renderMetrics()}
      </div>

      <div className="flex items-center space-x-2 text-violet-600 mb-4 pt-2 border-t">
        <BarChart3 size={20} />
        <h3 className="font-bold text-lg">Complexity Analysis</h3>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
          <Clock size={14} className="mr-2" /> Time Complexity
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {complexityItems.map((item, i) => (
            <Card key={i} className="p-3 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 border-none">
              <span className="text-sm font-medium text-slate-500">{item.label}</span>
              <span className={`font-mono font-bold ${item.color}`}>{item.value}</span>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center">
          <Box size={14} className="mr-2" /> Space Complexity
        </h4>
        <Card className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50 flex justify-between items-center">
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Worst Case</span>
          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{info.complexity.space}</span>
        </Card>
      </div>

      <section className="pt-6">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Internal Operations</h4>
        <div className="space-y-3">
          {info.operations.map((op, i) => (
            <div key={i} className="flex flex-col p-3 border rounded-lg hover:border-indigo-300 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">{op.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">{op.timeComplexity}</span>
              </div>
              <p className="text-[11px] text-slate-500">{op.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
