'use client';

import React from 'react';
import { STRUCTURES } from '@/data/structures';
import { Play, Layers, Zap, Code2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DemoPreview: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-[var(--color-background)] overflow-hidden">
      <div className="container px-6">
        <div className="relative group">
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-[4rem] opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />

          <div className="relative bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[3rem] shadow-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/9]">
            {/* Mock Toolbar */}
            <div className="h-14 border-b dark:border-white/5 flex items-center px-6 justify-between bg-white/50 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <Globe size={12} />
                  <span>lab.dsa-sandbox.io/stacks</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Layers size={16} />
                 </div>
              </div>
            </div>

            <div className="p-12 h-full flex items-center justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl items-center">
                 <div className="space-y-8">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                       <Zap size={12} className="text-indigo-600" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Live Preview</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                       The Ultimate Learning <br/>
                       <span className="text-indigo-600">Interface.</span>
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                       Witness how abstract data structures come to life with our flagship visualization engine.
                       Optimized for educational depth and professional clarity.
                    </p>
                    <div className="flex space-x-4">
                       <Button className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
                          <Play size={16} className="mr-2 fill-current" /> Play Simulation
                       </Button>
                       <Button variant="outline" className="h-12 px-8 rounded-xl border-slate-200 dark:border-white/10 font-bold">
                          <Code2 size={16} className="mr-2" /> Inspect Code
                       </Button>
                    </div>
                 </div>

                 {/* Visualizer Mockup */}
                 <div className="relative">
                    <div className="flex flex-col space-y-3">
                       {[0, 1, 2].map((i) => (
                         <div
                           key={i}
                           className={`h-16 w-full rounded-2xl border-2 shadow-sm flex items-center justify-between px-6 transition-all transform hover:-translate-y-1 cursor-default ${
                             i === 0 ? 'bg-indigo-600 border-indigo-400 text-white translate-x-4 z-10' :
                             i === 1 ? 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 translate-x-2' :
                             'bg-white dark:bg-slate-800 border-slate-50 dark:border-slate-700 text-slate-300'
                           }`}
                         >
                           <span className="font-black text-xl">{STRUCTURES['STACK'].name} Item {10 - i}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Memory: 0x{1024 + i * 16}</span>
                         </div>
                       ))}
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
