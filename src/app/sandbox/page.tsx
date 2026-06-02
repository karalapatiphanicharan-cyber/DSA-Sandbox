'use client';

import React from 'react';
import Link from 'next/link';
import { ControlPanel } from '@/components/sandbox/ControlPanel';
import { VisualizationCanvas } from '@/components/sandbox/VisualizationCanvas';
import { LearningPanel } from '@/components/sandbox/LearningPanel';
import { ComplexityPanel } from '@/components/sandbox/ComplexityPanel';
import { HistoryPanel } from '@/components/sandbox/HistoryPanel';
import { CodeGenerator } from '@/components/sandbox/CodeGenerator';
import { TimelineSlider } from '@/components/sandbox/TimelineSlider';
import { InterviewPanel } from '@/components/sandbox/InterviewPanel';
import { PerformanceLab } from '@/components/sandbox/PerformanceLab';
import { CompareMode } from '@/components/sandbox/CompareMode';
import { ChallengeMode } from '@/components/sandbox/ChallengeMode';
import { ThemeToggle } from '@/components/theme-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Menu,
  Settings,
  Info,
  Layers
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";

export default function SandboxPage() {
  const [showCompare, setShowCompare] = React.useState(false);

  return (
    <div className="h-screen w-full bg-[#F5F7FB] dark:bg-slate-950 flex flex-col overflow-hidden font-sans">
      {showCompare && <CompareMode onClose={() => setShowCompare(false)} />}
      {/* Premium Header */}
      <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center px-4 md:px-8 justify-between shrink-0 z-30 shadow-sm">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none group-hover:rotate-6 transition-transform">
              <Layers className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-black text-xl tracking-tight text-slate-800 dark:text-slate-100 uppercase">DSA Sandbox</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">Interactive Lab</p>
            </div>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
               <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Menu size={20} />
               </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
               <ScrollArea className="h-full">
                  <ControlPanel />
               </ScrollArea>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
               <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Info size={20} />
               </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-80">
               <div className="h-full flex flex-col">
                  <Tabs defaultValue="learning" className="flex-1 flex flex-col">
                    <div className="px-4 pt-8 border-b">
                      <TabsList className="w-full grid grid-cols-4 grid-rows-2 gap-1 mb-4 h-20">
                        <TabsTrigger value="learning" className="text-[10px]">Info</TabsTrigger>
                        <TabsTrigger value="complexity" className="text-[10px]">Stats</TabsTrigger>
                        <TabsTrigger value="history" className="text-[10px]">Log</TabsTrigger>
                        <TabsTrigger value="code" className="text-[10px]">Code</TabsTrigger>
                        <TabsTrigger value="interview" className="text-[10px]">Quiz</TabsTrigger>
                        <TabsTrigger value="challenges" className="text-[10px]">Quest</TabsTrigger>
                        <TabsTrigger value="performance" className="text-[10px]">Lab</TabsTrigger>
                      </TabsList>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                      <TabsContent value="learning" className="m-0"><LearningPanel /></TabsContent>
                      <TabsContent value="complexity" className="m-0"><ComplexityPanel /></TabsContent>
                      <TabsContent value="history" className="m-0"><HistoryPanel /></TabsContent>
                      <TabsContent value="code" className="m-0"><CodeGenerator /></TabsContent>
                      <TabsContent value="interview" className="m-0"><InterviewPanel /></TabsContent>
                      <TabsContent value="challenges" className="m-0"><ChallengeMode /></TabsContent>
                      <TabsContent value="performance" className="m-0"><PerformanceLab /></TabsContent>
                    </ScrollArea>
                  </Tabs>
               </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-4">
           <button
             onClick={() => setShowCompare(true)}
             className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all border border-indigo-100 dark:border-indigo-800/50"
           >
             Compare Mode
           </button>
           <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full border border-emerald-100 dark:border-emerald-800 font-black text-[10px] tracking-widest uppercase">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>System Online</span>
           </div>
           <ThemeToggle />
           <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Settings size={20} className="text-slate-600 dark:text-slate-400" />
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <PanelGroup orientation="horizontal">
          {/* Left Sidebar - Hidden on mobile */}
          <Panel defaultSize={20} minSize={15} className="hidden md:block border-r bg-white dark:bg-slate-900 overflow-y-auto shrink-0 z-20">
            <ControlPanel />
          </Panel>

          <PanelResizeHandle className="hidden md:flex w-1.5 items-center justify-center bg-slate-50 dark:bg-slate-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors group">
            <div className="w-1 h-8 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:bg-indigo-400" />
          </PanelResizeHandle>

          {/* Main Canvas Area */}
          <Panel defaultSize={55} minSize={30}>
            <div className="h-full flex flex-col p-2 md:p-6 space-y-4 overflow-hidden min-w-0 bg-[#F5F7FB] dark:bg-slate-950">
              <div className="flex-1 relative bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white dark:border-slate-800 overflow-hidden">
                <VisualizationCanvas />
              </div>

              <div className="h-24 md:h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white dark:border-slate-800 p-4 shrink-0">
                <TimelineSlider />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="hidden xl:flex w-1.5 items-center justify-center bg-slate-50 dark:bg-slate-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors group">
            <div className="w-1 h-8 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:bg-indigo-400" />
          </PanelResizeHandle>

          {/* Right Sidebar - Hidden on mobile/tablet */}
          <Panel defaultSize={25} minSize={20} className="hidden xl:flex bg-white dark:bg-slate-900 border-l flex-col overflow-hidden shrink-0 z-20">
            <Tabs defaultValue="learning" className="flex-1 flex flex-col">
              <div className="px-6 pt-6 border-b">
                <TabsList className="w-full grid grid-cols-4 grid-rows-2 gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl h-20">
                  <TabsTrigger value="learning" className="rounded-lg font-bold text-[9px] uppercase">Info</TabsTrigger>
                  <TabsTrigger value="complexity" className="rounded-lg font-bold text-[9px] uppercase">Stats</TabsTrigger>
                  <TabsTrigger value="history" className="rounded-lg font-bold text-[9px] uppercase">Log</TabsTrigger>
                  <TabsTrigger value="code" className="rounded-lg font-bold text-[9px] uppercase">Code</TabsTrigger>
                  <TabsTrigger value="interview" className="rounded-lg font-bold text-[9px] uppercase">Quiz</TabsTrigger>
                  <TabsTrigger value="challenges" className="rounded-lg font-bold text-[9px] uppercase">Quest</TabsTrigger>
                  <TabsTrigger value="performance" className="rounded-lg font-bold text-[9px] uppercase">Lab</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6">
                  <TabsContent value="learning" className="m-0"><LearningPanel /></TabsContent>
                  <TabsContent value="complexity" className="m-0"><ComplexityPanel /></TabsContent>
                  <TabsContent value="history" className="m-0"><HistoryPanel /></TabsContent>
                  <TabsContent value="code" className="m-0"><CodeGenerator /></TabsContent>
                  <TabsContent value="interview" className="m-0"><InterviewPanel /></TabsContent>
                  <TabsContent value="challenges" className="m-0"><ChallengeMode /></TabsContent>
                  <TabsContent value="performance" className="m-0"><PerformanceLab /></TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}
