'use client';

import React from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { STRUCTURES } from '@/data/structures';
import { BarChart3, Clock, Box } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ComplexityPanel: React.FC = () => {
  const { currentStructure } = useSandboxStore();
  const info = STRUCTURES[currentStructure];

  const complexityItems = [
    { label: 'Best Case', value: info.complexity.time.best, color: 'text-emerald-500' },
    { label: 'Average', value: info.complexity.time.average, color: 'text-amber-500' },
    { label: 'Worst Case', value: info.complexity.time.worst, color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-violet-600 mb-4">
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
