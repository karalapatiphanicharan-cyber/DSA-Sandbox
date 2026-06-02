'use client';

import React from 'react';

const stats = [
  { label: 'Educational Modules', value: '14+' },
  { label: 'Supported Operations', value: '40+' },
  { label: 'Data Structures', value: '14' },
  { label: 'Platform Readiness', value: '100%' },
];

export const Stats: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-6xl font-black text-indigo-600 mb-2">{s.value}</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
