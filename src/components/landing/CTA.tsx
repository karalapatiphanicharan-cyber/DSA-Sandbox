'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-5xl mx-auto rounded-[40px] bg-gradient-to-br from-indigo-600 to-violet-700 p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Master <br />Data Structures?</h2>
          <p className="text-indigo-100 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of students and developers who are learning visually and passing their technical interviews.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-16 px-12 rounded-2xl text-xl font-bold hover:scale-105 active:scale-95 transition-all">
            <Link href="/sandbox">
              Get Started for Free <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
