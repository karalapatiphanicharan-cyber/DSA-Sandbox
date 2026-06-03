'use client';

import React, { useState } from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { STRUCTURES } from '@/data/structures';
import { StructureType, TreeState, ListState, StackItem } from '@/types/structures';
import {
  Plus, Minus, Trash2,
  Settings2, PlayCircle, Dices,
  ArrowUp, ArrowDown, MapPin
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
import { insertBST, insertAVL, insertTrie, insertRBT, insertHeap } from '@/utils/treeLogic';
import { useHistoryStore } from '@/store/historyStore';
import { toast } from 'sonner';

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
    front,
    rear,
    size,
    setQueueState,
  } = useSandboxStore();

  const [inputValue, setInputValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('1');
  const [positionValue, setPositionValue] = useState('0');

  const getListLength = (head: ListState | null): number => {
    if (!head) return 0;
    let count = 0;
    let curr: ListState | null = head;
    const visited = new Set();
    while (curr && !visited.has(curr.id)) {
      count++;
      visited.add(curr.id);
      curr = curr.next;
    }
    return count;
  };

  const handleAdd = (location: 'default' | 'head' | 'tail' | 'position' = 'default') => {
    if (!inputValue && currentStructure !== 'TRIE') {
      toast.warning("Please enter a value.");
      return;
    }

    const numValue = Number(inputValue);
    const value = isNaN(numValue) ? inputValue : numValue;

    if (currentCategory === 'TREES') {
      if (currentStructure !== 'TRIE') {
          const exists = (node: TreeState | null, val: number): boolean => {
              if (!node) return false;
              if (node.value === val) return true;
              return val < (node.value as number) ? exists(node.left || null, val) : exists(node.right || null, val);
          };
          if (exists(treeData, numValue)) {
              toast.warning(`Duplicate value ${numValue} ignored.`);
              return;
          }
      }

      if (currentStructure === 'TRIE') {
        if (!inputValue) { toast.warning("Enter a word for Trie"); return; }
        const newTrie = insertTrie(treeData ? JSON.parse(JSON.stringify(treeData)) : null, inputValue);
        setTreeData(newTrie);
        addToHistory({ data, treeData: newTrie, listData, currentStructure, front, rear, size });
        setInputValue('');
        toast.success(`Word "${inputValue}" inserted.`);
        return;
      }

      if (currentStructure === 'HEAP') {
          const newHeap = insertHeap(treeData ? JSON.parse(JSON.stringify(treeData)) : null, numValue || 0);
          setTreeData(newHeap);
          addToHistory({ data, treeData: newHeap, listData, currentStructure, front, rear, size });
          setInputValue('');
          toast.success(`Value ${numValue} added to Heap.`);
          return;
      }

      let newTree: TreeState | null = null;
      if (currentStructure === 'AVL_TREE') newTree = insertAVL(treeData ? JSON.parse(JSON.stringify(treeData)) : null, numValue);
      else if (currentStructure === 'RED_BLACK_TREE') newTree = insertRBT(treeData ? JSON.parse(JSON.stringify(treeData)) : null, numValue);
      else newTree = insertBST(treeData ? JSON.parse(JSON.stringify(treeData)) : null, numValue);

      setTreeData(newTree);
      addToHistory({ data, treeData: newTree, listData, currentStructure, front, rear, size });
      setInputValue('');
      toast.success(`Inserted ${numValue}.`);
      return;
    }

    if (currentCategory === 'LINKED_LISTS') {
      const currentLen = getListLength(listData);
      if (currentLen >= maxSize) {
        toast.error("List Overflow: Max size reached.");
        return;
      }

      const newNode: ListState = { id: generateId(), value, next: null, prev: null };
      let newList = listData ? JSON.parse(JSON.stringify(listData)) as ListState : null;

      if (!newList) {
        newList = newNode;
        if (currentStructure === 'CIRCULAR_LINKED_LIST') newNode.next = newNode;
      } else {
        if (location === 'head') {
          if (currentStructure === 'CIRCULAR_LINKED_LIST') {
            let tail = newList;
            while (tail.next !== newList) tail = tail.next!;
            newNode.next = newList;
            tail.next = newNode;
          } else {
            newNode.next = newList;
            if (currentStructure === 'DOUBLY_LINKED_LIST') newList.prev = newNode;
          }
          newList = newNode;
        } else if (location === 'position') {
          const pos = Math.max(0, Math.min(currentLen, Number(positionValue)));
          if (pos === 0) {
              if (currentStructure === 'CIRCULAR_LINKED_LIST') {
                  let tail = newList;
                  while (tail.next !== newList) tail = tail.next!;
                  newNode.next = newList;
                  tail.next = newNode;
              } else {
                  newNode.next = newList;
                  if (currentStructure === 'DOUBLY_LINKED_LIST') newList.prev = newNode;
              }
              newList = newNode;
          } else {
              let curr = newList;
              for (let i = 0; i < pos - 1; i++) if (curr.next) curr = curr.next;
              newNode.next = curr.next;
              curr.next = newNode;
              if (currentStructure === 'DOUBLY_LINKED_LIST') {
                  newNode.prev = curr;
                  if (newNode.next && newNode.next !== newList) newNode.next.prev = newNode;
              }
          }
        } else {
          let curr = newList;
          while (curr.next && (currentStructure !== 'CIRCULAR_LINKED_LIST' || curr.next !== newList)) {
              curr = curr.next;
          }
          curr.next = newNode;
          if (currentStructure === 'DOUBLY_LINKED_LIST') newNode.prev = curr;
          if (currentStructure === 'CIRCULAR_LINKED_LIST') newNode.next = newList;
        }
      }
      setListData(newList);
      addToHistory({ data, treeData, listData: newList, currentStructure, front, rear, size });
      setInputValue('');
      toast.success(`Node ${value} added.`);
      return;
    }

    if (currentStructure === 'CIRCULAR_QUEUE') {
      if (size >= maxSize) {
        toast.error("Circular Queue Overflow: Capacity reached.");
        return;
      }
      const newRear = (rear + 1) % maxSize;
      const newItem = { id: generateId(), value, index: newRear };
      const newData = [...data];
      newData[newRear] = newItem;

      setData(newData);
      setQueueState({ front, rear: newRear, size: size + 1 });
      addToHistory({ data: newData, treeData, listData, currentStructure });
      setInputValue('');
      toast.success(`Value ${value} enqueued.`);
      return;
    }

    if (data.length >= maxSize) {
      toast.error(`${currentStructure} Overflow: Max size reached.`);
      return;
    }

    const newItem = { id: generateId(), value, priority: Number(priorityValue), index: data.length };
    let newData = [...data, newItem];

    if (currentStructure === 'PRIORITY_QUEUE') {
      newData.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    }
    if (currentStructure === 'DEQUE' && location === 'head') {
        newData = [newItem, ...data].map((it, i) => ({ ...it, index: i }));
    }

    const newQueueState = { front: 0, rear: newData.length - 1, size: newData.length };
    setData(newData);
    setQueueState(newQueueState);
    addToHistory({ data: newData, treeData, listData, currentStructure, ...newQueueState });
    setInputValue('');
    toast.success("Added successfully.");
  };

  const handlePopPosition = () => {
    if (!listData) { toast.error("List Underflow."); return; }
    const currentLen = getListLength(listData);
    const pos = Math.max(0, Math.min(currentLen - 1, Number(positionValue)));

    if (pos === 0) { handlePop('head'); return; }

    const newList = JSON.parse(JSON.stringify(listData)) as ListState;
    let curr = newList;
    for (let i = 0; i < pos - 1; i++) if (curr.next) curr = curr.next;

    if (curr.next) {
        const toDelete = curr.next;
        curr.next = toDelete.next;
        if (currentStructure === 'DOUBLY_LINKED_LIST' && curr.next && curr.next !== newList) {
            curr.next.prev = curr;
        }
    }

    setListData(newList);
    addToHistory({ data, treeData, listData: newList, currentStructure, front, rear, size });
    toast.success("Removed node at position.");
  };

  const handlePop = (location: 'default' | 'head' | 'tail' = 'default') => {
    if (currentCategory === 'TREES') {
      if (!treeData) { toast.error("Tree Underflow."); return; }
      setTreeData(null);
      addToHistory({ data, treeData: null, listData, currentStructure, front, rear, size });
      toast.success("Tree cleared.");
      return;
    }

    if (currentCategory === 'LINKED_LISTS') {
      if (!listData) { toast.error("List Underflow."); return; }
      let newList = JSON.parse(JSON.stringify(listData)) as ListState;

      if (!newList.next || (currentStructure === 'CIRCULAR_LINKED_LIST' && newList.next === newList)) {
          newList = null as unknown as ListState;
      } else if (location === 'head') {
          if (currentStructure === 'CIRCULAR_LINKED_LIST') {
              let tail = newList;
              while (tail.next !== newList) tail = tail.next!;
              newList = newList.next!;
              tail.next = newList;
          } else {
              newList = newList.next!;
              if (currentStructure === 'DOUBLY_LINKED_LIST') newList.prev = null;
          }
      } else {
          let curr = newList;
          let prev = null;
          while (curr.next && (currentStructure !== 'CIRCULAR_LINKED_LIST' || curr.next !== newList)) {
              prev = curr;
              curr = curr.next;
          }
          if (prev) prev.next = currentStructure === 'CIRCULAR_LINKED_LIST' ? newList : null;
          else newList = null as unknown as ListState;
      }

      setListData(newList);
      addToHistory({ data, treeData, listData: newList, currentStructure, front, rear, size });
      toast.success("Removed node.");
      return;
    }

    if (currentStructure === 'CIRCULAR_QUEUE') {
      if (size === 0) {
        toast.error("Circular Queue Underflow.");
        return;
      }
      const newData = [...data];
      // We don't actually delete the item in a real circular queue,
      // but for visualization we might want to null it out or mark as inactive.
    delete (newData as (StackItem | undefined)[])[front];

      const newFront = (front + 1) % maxSize;
      setData(newData);
      setQueueState({ front: newFront, rear, size: size - 1 });
      addToHistory({ data: newData, treeData, listData, currentStructure });
      toast.success("Value dequeued.");
      return;
    }

    if (data.length === 0) {
      toast.error(`${currentStructure} Underflow.`);
      return;
    }

    let newData;
    if (currentStructure === 'STACK' || (currentStructure === 'DEQUE' && location === 'tail')) {
      newData = data.slice(0, -1);
    } else {
      newData = data.slice(1);
    }

    const newQueueState = { front: 0, rear: newData.length - 1, size: newData.length };
    setData(newData);
    setQueueState(newQueueState);
    addToHistory({ data: newData, treeData, listData, currentStructure, ...newQueueState });
    toast.success("Removed successfully.");
  };

  const handleGenerate = (type: 'random' | 'sorted' | 'reverse-sorted') => {
    const vals = generateRandomArray(maxSize);
    if (type === 'sorted') vals.sort((a, b) => a - b);
    if (type === 'reverse-sorted') vals.sort((a, b) => b - a);

    if (currentStructure === 'CIRCULAR_QUEUE') {
      const newData = new Array(maxSize);
      vals.forEach((v, i) => {
        newData[i] = { id: generateId(), value: v, index: i };
      });
      setData(newData);
      setQueueState({ front: 0, rear: maxSize - 1, size: maxSize });
      addToHistory({ data: newData, treeData, listData, currentStructure });
      toast.success("Circular Queue filled with random data.");
      return;
    }

    if (currentCategory === 'TREES') {
      let root: TreeState | null = null;
      let sortedVals = Array.from(new Set(vals));
      if (type === 'random') {
          // Shuffle to avoid skewed trees for BST/RBT
          sortedVals = sortedVals.sort(() => Math.random() - 0.5);
      }
      sortedVals.forEach(v => {
          if (currentStructure === 'AVL_TREE') root = insertAVL(root, v);
          else if (currentStructure === 'RED_BLACK_TREE') root = insertRBT(root, v);
          else if (currentStructure === 'HEAP') root = insertHeap(root, v);
          else root = insertBST(root, v);
      });
      setTreeData(root);
      addToHistory({ data, treeData: root, listData, currentStructure, front, rear, size });
    } else if (currentCategory === 'LINKED_LISTS') {
      const nodes: ListState[] = vals.map(v => ({ id: generateId(), value: v, next: null, prev: null }));
      nodes.forEach((node, i) => {
          if (i < nodes.length - 1) {
              node.next = nodes[i + 1];
              if (currentStructure === 'DOUBLY_LINKED_LIST') nodes[i + 1].prev = node;
          }
      });
      if (currentStructure === 'CIRCULAR_LINKED_LIST' && nodes.length > 0) {
          nodes[nodes.length - 1].next = nodes[0];
      }
      const finalHead = nodes.length > 0 ? nodes[0] : null;
      setListData(finalHead);
      addToHistory({ data, treeData, listData: finalHead, currentStructure, front, rear, size });
    } else {
      const newData = vals.map((v, i) => ({ id: generateId(), value: v, priority: Math.floor(Math.random() * 10) + 1, index: i }));
      if (currentStructure === 'PRIORITY_QUEUE') newData.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      const newQueueState = { front: 0, rear: newData.length - 1, size: newData.length };
      setData(newData);
      setQueueState(newQueueState);
      addToHistory({ data: newData, treeData, listData, currentStructure, ...newQueueState });
    }
    toast.success(`Generated ${type} data.`);
  };

  const handleLinkedListOp = (op: 'reverse' | 'sort' | 'middle' | 'cycle') => {
    if (!listData) { toast.error("List is empty."); return; }
    const nodes: ListState[] = [];
    let curr: ListState | null = listData;
    const visited = new Set();
    while (curr && !visited.has(curr.id)) {
        nodes.push({ ...curr });
        visited.add(curr.id);
        curr = curr.next;
    }

    if (op === 'reverse') {
        nodes.reverse();
        nodes.forEach((node, i) => {
            node.next = nodes[i + 1] || null;
            if (currentStructure === 'DOUBLY_LINKED_LIST') node.prev = nodes[i - 1] || null;
        });
        if (currentStructure === 'CIRCULAR_LINKED_LIST') nodes[nodes.length - 1].next = nodes[0];
        const newList = nodes[0];
        setListData(newList);
        addToHistory({ data, treeData, listData: newList, currentStructure, front, rear, size });
        toast.success("List reversed.");
    } else if (op === 'sort') {
        nodes.sort((a, b) => (a.value as number) - (b.value as number));
        nodes.forEach((node, i) => {
            node.next = nodes[i + 1] || null;
            if (currentStructure === 'DOUBLY_LINKED_LIST') node.prev = nodes[i - 1] || null;
        });
        if (currentStructure === 'CIRCULAR_LINKED_LIST') nodes[nodes.length - 1].next = nodes[0];
        const newList = nodes[0];
        setListData(newList);
        addToHistory({ data, treeData, listData: newList, currentStructure, front, rear, size });
        toast.success("List sorted.");
    } else if (op === 'middle') {
        const mid = nodes[Math.floor(nodes.length / 2)];
        toast.info(`Middle element is: ${mid.value}`);
    } else if (op === 'cycle') {
        toast.info(currentStructure === 'CIRCULAR_LINKED_LIST' ? "Cycle detected (Circular List)." : "No cycle detected.");
    }
  };

  const handleClear = () => {
    useSandboxStore.getState().reset();
    addToHistory({ data: [], treeData: null, listData: null, currentStructure, front: 0, rear: -1, size: 0 });
    toast.info("Sandbox reset.");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-slate-400">
          <Settings2 size={14} />
          <h2 className="text-[10px] font-black uppercase tracking-widest">Configuration</h2>
        </div>

        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-slate-500 uppercase">Data Structure</Label>
          <Select
            value={currentStructure}
              onValueChange={(val: string | null) => {
                if (val) setStructure(val as StructureType, STRUCTURES[val as StructureType].category);
              }}
          >
            <SelectTrigger className="h-10 w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-4 focus:ring-2 focus:ring-indigo-500/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[1000] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              {Object.values(STRUCTURES).map((s) => (
                <SelectItem key={s.id} value={s.id} className="text-xs py-2.5 font-medium focus:bg-indigo-50 dark:focus:bg-indigo-900/20">{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[11px] font-bold text-slate-500 uppercase">Capacity</Label>
            <span className="text-[10px] font-mono bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded text-indigo-600 font-bold border border-indigo-100 dark:border-indigo-800">{maxSize}</span>
          </div>
          <Input type="range" min="5" max="30" value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer accent-indigo-600" />
        </div>
      </div>

      <Separator className="opacity-40" />

      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-slate-400">
          <PlayCircle size={14} />
          <h2 className="text-[10px] font-black uppercase tracking-widest">Operations</h2>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 space-y-1">
              <Label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Value</Label>
              <Input placeholder="Enter value..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} className="h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs" />
            </div>
            {currentStructure === 'PRIORITY_QUEUE' && (
              <div className="w-16 space-y-1">
                <Label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Pri</Label>
                <Input type="number" value={priorityValue} onChange={(e) => setPriorityValue(e.target.value)} className="h-10 rounded-xl text-xs" />
              </div>
            )}
            {currentCategory === 'LINKED_LISTS' && (
              <div className="w-16 space-y-1">
                <Label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Pos</Label>
                <Input type="number" value={positionValue} onChange={(e) => setPositionValue(e.target.value)} className="h-10 rounded-xl text-xs" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => handleAdd(currentStructure === 'DEQUE' ? 'head' : 'default')} className="h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
              <Plus size={14} className="mr-1.5" />
              {currentStructure === 'STACK' ? 'Push' : currentCategory === 'QUEUES' ? 'Enqueue' : 'Add'}
            </Button>
            <Button variant="outline" onClick={() => handlePop()} className="h-10 rounded-xl border-slate-200 font-bold text-xs">
              <Minus size={14} className="mr-1.5" />
              {currentStructure === 'STACK' ? 'Pop' : currentCategory === 'QUEUES' ? 'Dequeue' : 'Remove'}
            </Button>
          </div>

          {currentCategory === 'LINKED_LISTS' && (
              <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                      <Button variant="secondary" size="sm" onClick={() => handleAdd('head')} title="Insert at Beginning" className="h-9 text-[10px] font-bold rounded-lg"><ArrowUp size={12} className="mr-1"/> Head</Button>
                      <Button variant="secondary" size="sm" onClick={() => handleAdd('tail')} title="Insert at End" className="h-9 text-[10px] font-bold rounded-lg"><ArrowDown size={12} className="mr-1"/> Tail</Button>
                      <Button variant="secondary" size="sm" onClick={() => handleAdd('position')} title="Insert at Position" className="h-9 text-[10px] font-bold rounded-lg"><MapPin size={12} className="mr-1"/> Pos</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" onClick={() => handlePop('head')} title="Delete Head" className="h-9 text-[10px] font-bold rounded-lg text-rose-500">Del Head</Button>
                      <Button variant="outline" size="sm" onClick={() => handlePop('tail')} title="Delete Tail" className="h-9 text-[10px] font-bold rounded-lg text-rose-500">Del Tail</Button>
                      <Button variant="outline" size="sm" onClick={() => handlePopPosition()} title="Delete Position" className="h-9 text-[10px] font-bold rounded-lg text-rose-500 text-center">Del Pos</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleLinkedListOp('reverse')} className="h-8 text-[9px] font-black uppercase tracking-tighter">Reverse</Button>
                      <Button variant="outline" size="sm" onClick={() => handleLinkedListOp('sort')} className="h-8 text-[9px] font-black uppercase tracking-tighter">Sort</Button>
                      <Button variant="outline" size="sm" onClick={() => handleLinkedListOp('middle')} className="h-8 text-[9px] font-black uppercase tracking-tighter">Find Middle</Button>
                      <Button variant="outline" size="sm" onClick={() => handleLinkedListOp('cycle')} className="h-8 text-[9px] font-black uppercase tracking-tighter">Detect Cycle</Button>
                  </div>
              </div>
          )}

          {currentStructure === 'DEQUE' && (
              <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleAdd('tail')} className="h-9 text-[10px] font-bold rounded-lg">Push Rear</Button>
                  <Button variant="secondary" size="sm" onClick={() => handlePop('tail')} className="h-9 text-[10px] font-bold rounded-lg">Pop Rear</Button>
              </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={() => handleGenerate('random')} className="h-9 rounded-xl text-[10px] font-black uppercase bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
            <Dices size={12} className="mr-1.5" /> Random
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleGenerate('sorted')} className="h-9 rounded-xl text-[10px] font-black uppercase">
            <PlayCircle size={12} className="mr-1.5" /> Sorted
          </Button>
          <Button variant="ghost" size="sm" className="h-9 rounded-xl text-[10px] font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 uppercase col-span-2" onClick={handleClear}>
            <Trash2 size={12} className="mr-1.5" /> Clear Structure
          </Button>
        </div>
      </div>
    </div>
  );
};
