'use client';

import React from 'react';
import { Mail, Globe, Info, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-100">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">DS</span>
            </div>
            <span className="font-bold text-lg">DSA Sandbox</span>
          </div>

          <div className="text-slate-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-rose-500 fill-current" /> by DSA Visualizer Team
          </div>

          <div className="flex space-x-6 text-slate-400">
            <Mail size={20} className="hover:text-indigo-600 cursor-pointer" />
            <Globe size={20} className="hover:text-indigo-600 cursor-pointer" />
            <Info size={20} className="hover:text-indigo-600 cursor-pointer" />
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-slate-300">
          © 2024 DSA Sandbox Visualizer. All rights reserved. Exclusively for educational purposes.
        </div>
      </div>
    </footer>
  );
};
