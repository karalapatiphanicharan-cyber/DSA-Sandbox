'use client';

import React, { useState } from 'react';
import { STRUCTURES } from '@/data/structures';
import { StructureType } from '@/types/structures';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StackVisualizer } from '../visualizers/StackVisualizer';
import { QueueVisualizer } from '../visualizers/QueueVisualizer';
import { CircularQueueVisualizer } from '../visualizers/CircularQueueVisualizer';
import { DequeVisualizer } from '../visualizers/DequeVisualizer';
import { PriorityQueueVisualizer } from '../visualizers/PriorityQueueVisualizer';
import { LinkedListVisualizer } from '../visualizers/LinkedListVisualizer';
import { TrieVisualizer } from '../visualizers/TrieVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { generateRandomArray, generateId } from '@/utils/generators';
import { insertBST, insertAVL, insertRBT, insertHeap } from '@/utils/treeLogic';
import { ListState, TreeState, StackItem } from '@/types/structures';

export const CompareMode: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [structA, setStructA] = useState<StructureType>('STACK');
  const [structB, setStructB] = useState<StructureType>('QUEUE');

  // Independent states for each pane
  const [dataA, setDataA] = useState<StackItem[]>([]);
  const [treeA, setTreeA] = useState<TreeState | null>(null);
  const [listA, setListA] = useState<ListState | null>(null);

  const [dataB, setDataB] = useState<StackItem[]>([]);
  const [treeB, setTreeB] = useState<TreeState | null>(null);
  const [listB, setListB] = useState<ListState | null>(null);

  const generateData = (
    struct: StructureType,
    setData: (d: StackItem[]) => void,
    setTree: (t: TreeState | null) => void,
    setList: (l: ListState | null) => void
  ) => {
    const vals = generateRandomArray(8);
    const category = STRUCTURES[struct].category;

    if (category === 'TREES') {
      let root: TreeState | null = null;
      Array.from(new Set(vals)).forEach(v => {
        if (struct === 'AVL_TREE') root = insertAVL(root, v);
        else if (struct === 'RED_BLACK_TREE') root = insertRBT(root, v);
        else if (struct === 'HEAP') root = insertHeap(root, v);
        else root = insertBST(root, v);
      });
      setTree(root);
      setData([]);
      setList(null);
    } else if (category === 'LINKED_LISTS') {
      const nodes: ListState[] = vals.map(v => ({ id: generateId(), value: v, next: null, prev: null }));
      nodes.forEach((node, i) => {
        if (i < nodes.length - 1) {
          node.next = nodes[i + 1];
          if (struct === 'DOUBLY_LINKED_LIST') nodes[i + 1].prev = node;
        }
      });
      if (struct === 'CIRCULAR_LINKED_LIST' && nodes.length > 0) {
        nodes[nodes.length - 1].next = nodes[0];
      }
      setList(nodes.length > 0 ? nodes[0] : null);
      setData([]);
      setTree(null);
    } else {
      const newData = vals.map((v, i) => ({
        id: generateId(),
        value: v,
        priority: Math.floor(Math.random() * 10) + 1,
        index: i
      }));
      if (struct === 'PRIORITY_QUEUE') newData.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      setData(newData);
      setTree(null);
      setList(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <header className="h-20 border-b bg-white dark:bg-slate-900 flex items-center px-8 justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 dark:shadow-none">VS</div>
          <div>
            <h2 className="font-black text-xl tracking-tight text-slate-800 dark:text-slate-100 uppercase">Comparison Lab</h2>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">Side-by-side analysis</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl w-12 h-12 hover:bg-slate-100 dark:hover:bg-slate-800">
          <X size={24} />
        </Button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-800 h-1/2 lg:h-full overflow-hidden">
          <div className="p-6 border-b bg-white dark:bg-slate-900 flex items-center justify-between shrink-0">
            <Select
                value={structA}
                onValueChange={(val: string | null) => { if (val) setStructA(val as StructureType); }}
            >
              <SelectTrigger className="w-[240px] h-12 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[110] rounded-xl border-slate-200 dark:border-slate-800">
                {Object.values(STRUCTURES).map((s) => (
                  <SelectItem key={s.id} value={s.id} className="font-bold">{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <ComplexityBadge complexity={STRUCTURES[structA].complexity.time.average} label="AVG" />
              <ComplexityBadge complexity={STRUCTURES[structA].complexity.space} label="SPACE" />
            </div>
          </div>
          <div className="flex-1 relative bg-[#F5F7FB] dark:bg-slate-950/50 p-4 overflow-hidden flex flex-col">
            <div className="mb-4 flex justify-center">
              <Button size="sm" variant="outline" className="rounded-full px-6 font-bold" onClick={() => generateData(structA, setDataA, setTreeA, setListA)}>
                Regenerate A
              </Button>
            </div>
            <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-white dark:border-slate-800 overflow-hidden">
              <VisualizationCanvasOverride type={structA} data={dataA} treeData={treeA} listData={listA} />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col h-1/2 lg:h-full overflow-hidden">
          <div className="p-6 border-b bg-white dark:bg-slate-900 flex items-center justify-between shrink-0">
            <Select
                value={structB}
                onValueChange={(val: string | null) => { if (val) setStructB(val as StructureType); }}
            >
              <SelectTrigger className="w-[240px] h-12 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[110] rounded-xl border-slate-200 dark:border-slate-800">
                {Object.values(STRUCTURES).map((s) => (
                  <SelectItem key={s.id} value={s.id} className="font-bold">{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <ComplexityBadge complexity={STRUCTURES[structB].complexity.time.average} label="AVG" />
              <ComplexityBadge complexity={STRUCTURES[structB].complexity.space} label="SPACE" />
            </div>
          </div>
          <div className="flex-1 relative bg-[#F5F7FB] dark:bg-slate-950/50 p-4 overflow-hidden flex flex-col">
            <div className="mb-4 flex justify-center">
              <Button size="sm" variant="outline" className="rounded-full px-6 font-bold" onClick={() => generateData(structB, setDataB, setTreeB, setListB)}>
                Regenerate B
              </Button>
            </div>
            <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-white dark:border-slate-800 overflow-hidden">
              <VisualizationCanvasOverride type={structB} data={dataB} treeData={treeB} listData={listB} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplexityBadge: React.FC<{ complexity: string; label: string }> = ({ complexity, label }) => (
  <div className="flex flex-col items-end">
    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
    <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400">{complexity}</span>
  </div>
);

const VisualizationCanvasOverride: React.FC<{
  type: StructureType;
  data: StackItem[];
  treeData: TreeState | null;
  listData: ListState | null
}> = ({ type, data, treeData, listData }) => {
  const renderVisualizer = () => {
    switch (type) {
      case 'STACK': return <StackVisualizer data={data} maxSize={20} />;
      case 'QUEUE': return <QueueVisualizer data={data} />;
      case 'CIRCULAR_QUEUE': return <CircularQueueVisualizer data={data} maxSize={10} />;
      case 'DEQUE': return <DequeVisualizer data={data} />;
      case 'PRIORITY_QUEUE': return <PriorityQueueVisualizer data={data} />;
      case 'LINKED_LIST':
      case 'DOUBLY_LINKED_LIST':
      case 'CIRCULAR_LINKED_LIST':
          return <LinkedListVisualizer data={listData} structure={type} />;
      case 'BINARY_TREE':
      case 'BINARY_SEARCH_TREE':
      case 'AVL_TREE':
      case 'RED_BLACK_TREE':
      case 'HEAP':
          return <TreeVisualizer data={treeData} structure={type} />;
      case 'TRIE': return <TrieVisualizer data={treeData} />;
      default: return <StackVisualizer data={data} maxSize={20} />;
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-slate-50/30 dark:bg-slate-900/30">
      <div className="absolute top-4 right-4 z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-md border shadow-sm">
        {STRUCTURES[type].category}
      </div>
      <div className="h-full w-full flex items-center justify-center">
        {renderVisualizer()}
      </div>
    </div>
  );
};
