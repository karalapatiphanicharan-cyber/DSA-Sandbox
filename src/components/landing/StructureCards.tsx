'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { STRUCTURES } from '@/data/structures';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const StructureCards: React.FC = () => {
  const allStructures = Object.values(STRUCTURES);

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 dark:text-slate-100">Supported Structures</h2>
          <p className="text-slate-500 dark:text-slate-400">14+ Data structures with unique visual experiences and real-time operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allStructures.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all hover:border-indigo-500 dark:hover:border-indigo-400 group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="text-[10px] uppercase font-black text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/20">
                    {s.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-black mb-2 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{s.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {s.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase">View Details</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
