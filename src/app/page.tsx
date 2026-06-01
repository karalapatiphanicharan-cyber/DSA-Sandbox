'use client';

import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { DemoPreview } from '@/components/landing/DemoPreview';
import { Features } from '@/components/landing/Features';
import { StructureCards } from '@/components/landing/StructureCards';
import { Stats } from '@/components/landing/Stats';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Hero />
      <DemoPreview />
      <StructureCards />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}
