'use client';

import React, { useState } from 'react';
import { useSandboxStore } from '@/store/sandboxStore';
import { generateCode } from '@/utils/codeGenerator';
import { Copy, Download, Code2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export const CodeGenerator: React.FC = () => {
  const { currentStructure, data, treeData, listData } = useSandboxStore();
  const [language, setLanguage] = useState('Python');
  const [copied, setCopied] = useState(false);

  const code = generateCode(currentStructure, language, data, treeData, listData);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${currentStructure.toLowerCase()}_impl.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-600">
          <Code2 size={20} />
          <h3 className="font-bold text-lg">Code Generator</h3>
        </div>

        <Select value={language} onValueChange={(val: string | null) => val && setLanguage(val)}>
          <SelectTrigger className="w-32 h-9 text-xs font-bold rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Python">Python</SelectItem>
            <SelectItem value="Java">Java</SelectItem>
            <SelectItem value="JavaScript">JavaScript</SelectItem>
            <SelectItem value="C++">C++</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative group">
        <div className="absolute top-4 right-4 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm" className="h-8 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 text-white border-none" onClick={handleCopy}>
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </Button>
          <Button variant="secondary" size="sm" className="h-8 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 text-white border-none" onClick={handleDownload}>
            <Download size={14} />
          </Button>
        </div>

        <pre className="p-6 bg-slate-950 text-slate-300 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto shadow-2xl min-h-[300px] border border-slate-800">
          <code className="block whitespace-pre">
            {code}
          </code>
        </pre>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
        <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium italic">
          Tip: The generated code reflects the current state and structure of your sandbox. Use it as a starting point for your implementations.
        </p>
      </div>
    </div>
  );
};
