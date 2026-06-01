'use client';

import React from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { STRUCTURES } from '@/data/structures';
import { BookOpen, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const LearningPanel: React.FC = () => {
  const { currentStructure } = useSandboxStore();
  const info = STRUCTURES[currentStructure];

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center space-x-2 text-indigo-600 mb-2">
          <BookOpen size={20} />
          <h3 className="font-bold text-lg">Definition</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {info.description}
        </p>
      </section>

      <section>
        <div className="flex items-center space-x-2 text-amber-500 mb-3">
          <Lightbulb size={20} />
          <h3 className="font-bold text-lg">Real-world Uses</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {info.realWorldUses.map((use, i) => (
            <Badge key={i} variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
              {use}
            </Badge>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4">
        <section className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
          <div className="flex items-center space-x-2 text-emerald-600 mb-2">
            <CheckCircle2 size={18} />
            <h4 className="font-bold text-sm uppercase">Advantages</h4>
          </div>
          <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
            {info.advantages.map((adv, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span> {adv}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-4 bg-rose-50 dark:bg-rose-900/10 rounded-xl border border-rose-100 dark:border-rose-800/50">
          <div className="flex items-center space-x-2 text-rose-600 mb-2">
            <AlertCircle size={18} />
            <h4 className="font-bold text-sm uppercase">Disadvantages</h4>
          </div>
          <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
            {info.disadvantages.map((dis, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span> {dis}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
