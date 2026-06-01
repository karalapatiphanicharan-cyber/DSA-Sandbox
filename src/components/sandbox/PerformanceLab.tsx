'use client';

import React, { useState } from 'react';
import {
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';
import { Activity, Zap, Info, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSandboxStore } from '@/store/sandboxStore';

const INITIAL_DATA = [
  { name: '10', stack: 1, bst: 4, list: 10 },
  { name: '100', stack: 1, bst: 7, list: 100 },
  { name: '500', stack: 1, bst: 9, list: 500 },
  { name: '1000', stack: 1, bst: 10, list: 1000 },
  { name: '5000', stack: 1, bst: 12, list: 5000 },
];

export const PerformanceLab: React.FC = () => {
  const { currentStructure } = useSandboxStore();
  const [benchData, setBenchData] = useState(INITIAL_DATA);
  const [isRunning, setIsRunning] = useState(false);

  const runBenchmark = () => {
    setIsRunning(true);
    // Simulate real-time measurement by adding slight jitter to theoretical values
    setTimeout(() => {
        const newData = INITIAL_DATA.map(d => ({
            ...d,
            stack: Math.max(1, d.stack + (Math.random() - 0.5) * 0.5),
            bst: Math.max(1, d.bst + (Math.random() - 0.5) * 2),
            list: Math.max(1, d.list + (Math.random() - 0.5) * 10),
        }));
        setBenchData(newData);
        setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
            <Activity className="text-white" size={24} />
            </div>
            <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Performance Lab</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Benchmarking Engine</p>
            </div>
        </div>
        <Button
            size="sm"
            onClick={runBenchmark}
            disabled={isRunning}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold"
        >
            <Play size={14} className="mr-2" />
            {isRunning ? 'Running...' : 'Run Benchmark'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4 border-none bg-indigo-50 dark:bg-indigo-900/10 shadow-inner flex items-start space-x-3">
          <Zap className="text-amber-500 shrink-0" size={18} />
          <div>
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase mb-1">Theoretical Efficiency</h4>
            <p className="text-[11px] text-indigo-700/70 dark:text-indigo-300/70 leading-relaxed">
              Comparing search operations across different data scales. Observe how BST remains logarithmic while Lists grow linearly.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-none bg-white dark:bg-slate-900 shadow-xl rounded-3xl overflow-hidden">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center">
          <Activity size={14} className="mr-2" /> Search Operations (Time vs N)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={benchData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBST" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorList" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 'bold'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 'bold'}} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
              <Area type="monotone" dataKey="stack" stroke="#6366F1" fillOpacity={1} fill="url(#colorStack)" strokeWidth={3} name="O(1) Constant" />
              <Area type="monotone" dataKey="bst" stroke="#10B981" fillOpacity={1} fill="url(#colorBST)" strokeWidth={3} name="O(log n) BST" />
              <Area type="monotone" dataKey="list" stroke="#EF4444" fillOpacity={1} fill="url(#colorList)" strokeWidth={3} name="O(n) Linear" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-none bg-slate-50 dark:bg-slate-900 shadow-sm">
            <h5 className="text-[10px] font-black uppercase text-slate-400 mb-2">Selected Struct</h5>
            <div className="text-sm font-bold text-indigo-600">{currentStructure.replace('_', ' ')}</div>
          </Card>
          <Card className="p-4 border-none bg-slate-50 dark:bg-slate-900 shadow-sm">
            <h5 className="text-[10px] font-black uppercase text-slate-400 mb-2">Engine Status</h5>
            <div className="text-sm font-bold text-emerald-600">READY</div>
          </Card>
      </div>

      <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center space-x-2 opacity-50">
          <Info size={14} className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Benchmarking results are simulated</span>
      </div>
    </div>
  );
};
