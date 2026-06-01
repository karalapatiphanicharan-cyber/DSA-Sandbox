'use client';

import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Layers, Sparkles, Play, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

interface FloatingNodeProps {
  delay?: number;
  x?: string;
  y?: string;
  size?: number;
  color?: string;
  duration?: number;
}

const FloatingNode: React.FC<FloatingNodeProps> = ({ delay = 0, x = "0%", y = "0%", size = 40, color = "bg-indigo-500", duration = 7 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.1, 1],
      y: ["0%", "-20%", "0%"]
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute rounded-2xl blur-sm ${color} mix-blend-multiply opacity-20`}
    style={{ left: x, top: y, width: size, height: size }}
  />
);

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20 },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#F5F7FB] dark:bg-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingNode x="10%" y="20%" size={120} color="bg-indigo-400" delay={0} duration={8} />
        <FloatingNode x="85%" y="15%" size={180} color="bg-purple-400" delay={1} duration={9} />
        <FloatingNode x="75%" y="70%" size={150} color="bg-cyan-400" delay={2} duration={7} />
        <FloatingNode x="15%" y="75%" size={100} color="bg-pink-400" delay={3} duration={10} />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />

        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[140px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[140px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl w-full text-center space-y-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-full border border-white/80 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <Sparkles size={14} className="text-indigo-600 animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-indigo-600/80 dark:text-indigo-400">Premium DSA Visual Experience</span>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-[0.85] filter drop-shadow-sm">
            Visualize.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 drop-shadow-none">
              Master. Build.
            </span>
          </h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-500/90 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            The world&apos;s most sophisticated data structure visualizer.
            Transform abstract concepts into <span className="text-indigo-600 dark:text-indigo-400 font-bold">interactive mental models</span>.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <Link href="/sandbox">
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl shadow-[0_20px_50px_rgba(99,102,241,0.3)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.5)] transition-all duration-300 group hover:-translate-y-1">
              Launch Sandbox <Play size={18} className="ml-3 fill-current group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="h-16 px-10 rounded-2xl border-white/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xl border shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            View Demo
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="pt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { label: 'Interactive', sub: 'Real-time simulation', icon: <Zap size={20} />, color: 'text-amber-500' },
            { label: 'Educational', sub: 'Concept breakdowns', icon: <Sparkles size={20} />, color: 'text-indigo-500' },
            { label: 'Enterprise', sub: 'Production quality', icon: <Shield size={20} />, color: 'text-emerald-500' },
            { label: 'Visual', sub: 'Step-by-step logic', icon: <Layers size={20} />, color: 'text-purple-500' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-white/60 dark:border-slate-800 flex flex-col items-start text-left space-y-4 hover:bg-white/70 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-inner flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-tighter text-slate-800 dark:text-slate-100">{item.label}</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero Visual - Floating Node Connections */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none opacity-20 md:opacity-40">
        <svg viewBox="0 0 1000 400" className="w-full h-full">
          <motion.path
            d="M 100 300 Q 250 100 400 250 T 700 200 T 900 350"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="4"
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-purple-500)" />
              <stop offset="100%" stopColor="var(--color-cyan-500)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};
