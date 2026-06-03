'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Box, ArrowLeft } from 'lucide-react';
import { useSandboxStore } from '@/store/sandboxStore';
import { ListState } from '@/types/structures';

export const LinkedListVisualizer: React.FC<{ data?: ListState | null, structure?: string }> = ({ data: propsData, structure: propsStructure }) => {
  const { listData: storeData, currentStructure: storeStructure } = useSandboxStore();
  const listData = propsData !== undefined ? propsData : storeData;
  const currentStructure = propsStructure || storeStructure;

  const nodes = React.useMemo(() => {
    const arr = [];
    let curr = listData;
    const visited = new Set();
    while (curr && !visited.has(curr.id)) {
      arr.push(curr);
      visited.add(curr.id);
      curr = curr.next;
    }
    return arr;
  }, [listData]);

  const isCircular = currentStructure === 'CIRCULAR_LINKED_LIST';
  const isDoubly = currentStructure === 'DOUBLY_LINKED_LIST';

  return (
    <div className="relative h-full w-full flex items-center justify-center p-16 overflow-auto bg-[var(--color-slate-50)] dark:bg-slate-950/50">
      <div className="flex items-center min-w-max pr-32 relative">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 100 }}
                className="flex flex-col items-center relative"
              >
                {index === 0 && (
                  <div className="absolute -top-10 px-3 py-1 bg-indigo-500 text-white text-[9px] font-black rounded-full shadow-lg">
                    HEAD
                  </div>
                )}

                <div className="flex items-stretch h-16 w-36 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden group hover:border-indigo-500 transition-colors">
                   {isDoubly && (
                       <div className="w-8 bg-slate-50 dark:bg-slate-900 flex items-center justify-center border-r">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-300" title="Prev" />
                       </div>
                   )}
                   <div className="flex-1 flex items-center justify-center">
                      <span className="text-lg font-black text-slate-800 dark:text-slate-100">{node.value}</span>
                   </div>
                   <div className="w-8 bg-slate-50 dark:bg-slate-900 flex items-center justify-center border-l">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" title="Next" />
                   </div>
                </div>

                <div className="mt-2 font-mono text-[8px] font-bold text-slate-400">
                  {node.id.slice(0, 4)}
                </div>
              </motion.div>

              <div className="flex flex-col items-center justify-center w-12 -mx-1 relative">
                 <div className="w-full h-0.5 bg-indigo-500/40 relative">
                    <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 text-indigo-500 w-4 h-4" />
                 </div>
                 {isDoubly && (
                     <div className="w-full h-0.5 bg-slate-400/20 mt-1 relative">
                         <ArrowLeft className="absolute -left-2 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                     </div>
                 )}
              </div>

              {index === nodes.length - 1 && (
                <div className="flex flex-col items-center ml-2 relative">
                  <div className={`w-12 h-8 border-2 border-dashed ${isCircular ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200'} rounded-lg flex items-center justify-center`}>
                    <span className="text-[8px] font-black text-slate-400 uppercase">{isCircular ? 'HEAD' : 'NULL'}</span>
                  </div>
                  <div className="absolute -top-10 px-3 py-1 bg-rose-500 text-white text-[9px] font-black rounded-full shadow-lg">
                    TAIL
                  </div>

                  {isCircular && (
                      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                          <path
                            d={`M ${nodes.length * 188 - 50} 32 Q ${nodes.length * 188 / 2} -80 60 32`}
                            fill="none"
                            stroke="var(--color-indigo-500)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            opacity="0.3"
                          />
                      </svg>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>

        {nodes.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Box size={32} className="text-slate-200" />
            <div className="text-slate-300 font-black uppercase tracking-widest text-[10px]">
              Empty List
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
