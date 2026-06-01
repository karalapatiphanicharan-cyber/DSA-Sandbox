'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Shield, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Onboarding: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenOnboarding = localStorage.getItem('dsa_onboarding_seen');
      if (!hasSeenOnboarding) {
        // Use a small timeout to move it out of the immediate effect cycle if needed,
        // but better to just set it.
        // Actually the rule is about synchronous setState in effect.
        const timer = setTimeout(() => setIsOpen(true), 100);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dsa_onboarding_seen', 'true');
    }
    setIsOpen(false);
  };

  const steps = [
    {
      icon: <Layers className="text-indigo-600" />,
      title: "Choose Your Structure",
      desc: "Select from 14+ data structures in the left panel to begin your visualization journey."
    },
    {
      icon: <Zap className="text-amber-500" />,
      title: "Interactive Operations",
      desc: "Add, remove, and shuffle data. Watch as the engine animates every memory shift in real-time."
    },
    {
      icon: <Shield className="text-emerald-500" />,
      title: "Master the Theory",
      desc: "Use the right hub to analyze complexity, generate code, and complete interview-ready quests."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white dark:border-white/5 overflow-hidden"
          >
            <div className="p-12">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Welcome to the Lab</span>
                  </div>
                  <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Start Your Learning Journey</h2>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-full transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="grid gap-8 mb-12">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shadow-inner">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{step.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button onClick={handleClose} size="lg" className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg w-full sm:w-auto shadow-xl shadow-indigo-200 dark:shadow-none group">
                  Enter Sandbox <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Takes less than 30 seconds</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 p-6 border-t border-slate-100 dark:border-white/5 flex justify-center">
               <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <div key={v} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[8px] font-black text-indigo-600">
                    +2k
                  </div>
               </div>
               <span className="ml-4 text-[10px] font-bold text-slate-400 uppercase self-center tracking-widest">Joined by thousands of learners</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
