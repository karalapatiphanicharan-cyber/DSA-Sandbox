'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, Shield, Clock, BarChart3, Binary } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Real-Time Visualization', desc: 'Buttery smooth animations for every data mutation.', color: 'bg-amber-500' },
  { icon: Code, title: 'Multi-Language', desc: 'Instant code generation in 4 major languages.', color: 'bg-indigo-500' },
  { icon: Clock, title: 'Time Travel', desc: 'Rewind and replay operations step-by-step.', color: 'bg-rose-500' },
  { icon: BarChart3, title: 'Complexity Analysis', desc: 'Big O metrics calculated for every action.', color: 'bg-emerald-500' },
  { icon: Binary, title: 'Memory Mapping', desc: 'Visualize internal memory and pointer logic.', color: 'bg-cyan-500' },
  { icon: Shield, title: 'Interview Ready', desc: 'Curated questions from FAANG interview loops.', color: 'bg-violet-500' },
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Everything you need to master DSA.</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">A comprehensive suite of tools designed to bridge the gap between theory and implementation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:scale-[1.02] transition-all group"
            >
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-black mb-3">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
