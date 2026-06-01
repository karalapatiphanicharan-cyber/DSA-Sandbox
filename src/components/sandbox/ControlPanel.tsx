'use client';

import React, { useState } from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { STRUCTURES } from '@/data/structures';
import { StructureType, TreeState, ListState } from '@/types/structures';
import {
  Plus, Minus, Trash2, Shuffle,
  ArrowRightLeft, Settings2, PlayCircle, Dices
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { generateId, generateRandomArray } from '@/utils/generators';
import { insertBST, insertAVL, insertTrie, insertRBT } from '@/utils/treeLogic';
import { useHistoryStore } from '@/store/historyStore';

export const ControlPanel: React.FC = () => {
  const addToHistory = useHistoryStore(state => state.addToHistory);
  const {
    currentStructure,
    currentCategory,
    setStructure,
    data,
    setData,
    treeData,
    setTreeData,
    listData,
    setListData,
    maxSize,
    setMaxSize,
    reset
  } = useSandboxStore();

  const [inputValue, setInputValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('1');

  const handleAdd = () => {
    if (!inputValue) return;

    const numValue = Number(inputValue);
    const value = isNaN(numValue) ? inputValue : numValue;

    if (currentCategory === 'TREES') {
      if (currentStructure === 'TRIE') {
        const newTrie = insertTrie(treeData ? { ...treeData } : null, inputValue);
        setTreeData(newTrie);
        addToHistory({ data, treeData: newTrie, listData, currentStructure });
        setInputValue('');
        return;
      }

      let newTree: TreeState | null = null;
      if (currentStructure === 'BINARY_SEARCH_TREE' || currentStructure === 'BINARY_TREE') {
        newTree = insertBST(treeData ? { ...treeData } : null, numValue || 0);
      } else if (currentStructure === 'AVL_TREE') {
        newTree = insertAVL(treeData ? { ...treeData } : null, numValue || 0);
      } else if (currentStructure === 'RED_BLACK_TREE') {
        newTree = insertRBT(treeData ? { ...treeData } : null, numValue || 0);
      } else {
        newTree = insertBST(treeData ? { ...treeData } : null, numValue || 0);
      }
      setTreeData(newTree);
      addToHistory({ data, treeData: newTree, listData, currentStructure });
      setInputValue('');
      return;
    }

    if (currentCategory === 'LINKED_LISTS') {
      const newNode: ListState = {
        id: generateId(),
        value: value,
        next: null,
        prev: null
      };

      let newList: ListState | null;
      if (!listData) {
        newList = newNode;
      } else {
        newList = JSON.parse(JSON.stringify(listData)) as ListState;
        let curr = newList;
        while (curr.next) curr = curr.next;
        curr.next = newNode;
        if (currentStructure === 'DOUBLY_LINKED_LIST') {
          newNode.prev = curr;
        }
      }
      setListData(newList);
      addToHistory({ data, treeData, listData: newList, currentStructure });
      setInputValue('');
      return;
    }

    if (data.length >= maxSize) return;

    const newItem = {
      id: generateId(),
      value: value,
      priority: Number(priorityValue),
      index: data.length
    };

    const newData = [...data, newItem];
    setData(newData);
    addToHistory({ data: newData, treeData, listData, currentStructure });
    setInputValue('');
  };

  const handlePop = () => {
    if (currentCategory === 'TREES') {
      setTreeData(null);
      addToHistory({ data, treeData: null, listData, currentStructure });
      return;
    }
    if (currentCategory === 'LINKED_LISTS') {
      if (!listData) return;
      let newList: ListState | null;
      if (!listData.next) {
        newList = null;
      } else {
        newList = JSON.parse(JSON.stringify(listData)) as ListState;
        let curr = newList;
        while (curr.next && curr.next.next) curr = curr.next;
        curr.next = null;
      }
      setListData(newList);
      addToHistory({ data, treeData, listData: newList, currentStructure });
      return;
    }
    if (data.length === 0) return;
    const newData = data.slice(0, -1);
    setData(newData);
    addToHistory({ data: newData, treeData, listData, currentStructure });
  };

  const handleGenerate = (type: 'random' | 'sorted' | 'reverse-sorted') => {
    const vals = generateRandomArray(Math.floor(maxSize / 2));
    if (type === 'sorted') vals.sort((a, b) => a - b);
    if (type === 'reverse-sorted') vals.sort((a, b) => b - a);

    if (currentCategory === 'TREES') {
      let newTree: TreeState | null = null;
      vals.forEach(v => {
        if (currentStructure === 'AVL_TREE') {
          newTree = insertAVL(newTree, v);
        } else {
          newTree = insertBST(newTree, v);
        }
      });
      setTreeData(newTree);
      addToHistory({ data, treeData: newTree, listData, currentStructure });
      return;
    }

    if (currentCategory === 'LINKED_LISTS') {
      let head: ListState | null = null;
      let curr: ListState | null = null;
      vals.forEach(v => {
        const newNode: ListState = { id: generateId(), value: v, next: null, prev: null };
        if (!head) {
          head = newNode;
          curr = head;
        } else if (curr) {
          curr.next = newNode;
          if (currentStructure === 'DOUBLY_LINKED_LIST') newNode.prev = curr;
          curr = newNode;
        }
      });
      setListData(head);
      addToHistory({ data, treeData, listData: head, currentStructure });
      return;
    }

    const newData = vals.map((v, i) => ({
      id: generateId(),
      value: v,
      priority: Math.floor(Math.random() * 10) + 1,
      index: i
    }));
    setData(newData);
    addToHistory({ data: newData, treeData, listData, currentStructure });
  };

  const handleShuffle = () => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const newData = shuffled.map((item, i) => ({ ...item, index: i }));
    setData(newData);
    addToHistory({ data: newData, treeData, listData, currentStructure });
  };

  const handleReverse = () => {
    if (currentCategory === 'LINKED_LISTS') {
      if (!listData) return;
      let prev: ListState | null = null;
      let curr: ListState | null = JSON.parse(JSON.stringify(listData)) as ListState;
      let next: ListState | null = null;
      while (curr) {
        next = curr.next;
        curr.next = prev;
        if (currentStructure === 'DOUBLY_LINKED_LIST') {
          curr.prev = next;
        }
        prev = curr;
        curr = next;
      }
      setListData(prev);
      addToHistory({ data, treeData, listData: prev, currentStructure });
      return;
    }
    const reversed = [...data].reverse();
    const newData = reversed.map((item, i) => ({ ...item, index: i }));
    setData(newData);
    addToHistory({ data: newData, treeData, listData, currentStructure });
  };

  const handleClear = () => {
    reset();
    addToHistory({ data: [], treeData: null, listData: null, currentStructure });
  };

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-slate-400">
          <Settings2 size={16} />
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Configuration</h2>
        </div>

        <div className="space-y-3">
          <Label className="text-xs font-bold text-slate-500">Data Structure</Label>
          <Select
            value={currentStructure}
              onValueChange={(val: string | null) => val && setStructure(val as StructureType, STRUCTURES[val as StructureType].category)}
          >
            <SelectTrigger className="h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(STRUCTURES).map((s) => (
                <SelectItem key={s.id} value={s.id} className="font-medium">{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-slate-500">Max Size</Label>
            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-indigo-600 font-bold">{maxSize}</span>
          </div>
          <Input
            type="range"
            min="5"
            max="20"
            value={maxSize}
            onChange={(e) => setMaxSize(Number(e.target.value))}
            className="h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      <Separator className="opacity-50" />

      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-slate-400">
          <PlayCircle size={16} />
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Operations</h2>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 ml-1">Value</Label>
              <Input
                placeholder="Enter value..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="h-11 rounded-xl border-slate-200 dark:border-slate-800"
              />
            </div>
            {currentStructure === 'PRIORITY_QUEUE' && (
              <div className="w-20 space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 ml-1">Pri</Label>
                <Input
                  type="number"
                  placeholder="1"
                  value={priorityValue}
                  onChange={(e) => setPriorityValue(e.target.value)}
                  className="h-11 rounded-xl border-slate-200 dark:border-slate-800"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleAdd} className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none font-bold">
              <Plus size={18} className="mr-2" />
              {currentStructure === 'STACK' ? 'Push' :
               currentCategory === 'QUEUES' ? 'Enqueue' :
               currentCategory === 'LINKED_LISTS' ? 'Insert' : 'Add'}
            </Button>

            <Button variant="outline" onClick={handlePop} disabled={data.length === 0 && !treeData && !listData} className="h-11 rounded-xl border-slate-200 dark:border-slate-800 font-bold">
              <Minus size={18} className="mr-2" />
              {currentStructure === 'STACK' ? 'Pop' :
               currentCategory === 'QUEUES' ? 'Dequeue' :
               currentCategory === 'LINKED_LISTS' ? 'Delete' : 'Remove'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={handleShuffle} className="h-10 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all">
            <Shuffle size={14} className="mr-2" /> Shuffle
          </Button>
          <Button variant="secondary" size="sm" onClick={handleReverse} className="h-10 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all">
            <ArrowRightLeft size={14} className="mr-2" /> Reverse
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleGenerate('random')} className="h-10 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-all">
            <Dices size={14} className="mr-2" /> Random
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleGenerate('sorted')} className="h-10 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all">
            <PlayCircle size={14} className="mr-2" /> Sorted
          </Button>
          <Button variant="ghost" size="sm" className="h-10 rounded-xl text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10" onClick={handleClear}>
            <Trash2 size={14} className="mr-2" /> Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};
