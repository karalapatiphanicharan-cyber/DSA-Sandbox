'use client';

import React from 'react';
import { useChallengeStore } from '@/store/challengeStore';
import { Trophy, Target, Award, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

const CHALLENGES = [
  {
    id: 'stack-top-80',
    title: 'Top Element Quest',
    description: 'Make 80 become the top element using minimum operations.',
    structure: 'STACK',
    xp: 50
  },
  {
    id: 'bst-balance',
    title: 'Zen Balance',
    description: 'Insert values to create a perfectly balanced BST of height 2.',
    structure: 'BINARY_SEARCH_TREE',
    xp: 75
  },
  {
    id: 'list-reverse',
    title: 'The Great Inversion',
    description: 'Reverse a linked list of at least 5 elements.',
    structure: 'LINKED_LIST',
    xp: 60
  }
];

export const ChallengeMode: React.FC = () => {
  const { xp, level, completedChallenges, completeChallenge } = useChallengeStore();
  const nextLevelXP = level * 100;
  const currentLevelProgress = (xp % 100);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-indigo-600 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-200 dark:shadow-none overflow-hidden relative">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-black">Level {level}</h3>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">DS Mastermind</p>
            </div>
            <Trophy size={40} className="text-amber-300 drop-shadow-lg" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-200">
              <span>{xp} XP Total</span>
              <span>{nextLevelXP - (xp % 100)} XP to Lvl {level + 1}</span>
            </div>
            <Progress value={currentLevelProgress} className="h-2 bg-indigo-900/40" />
          </div>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-100">
          <Target size={20} className="text-rose-500" />
          <h4 className="font-bold text-lg">Active Missions</h4>
        </div>

        <div className="grid gap-4">
          {CHALLENGES.map((challenge) => {
            const isDone = completedChallenges.includes(challenge.id);
            return (
              <Card key={challenge.id} className={`p-4 border-none shadow-sm transition-all hover:shadow-md group ${isDone ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'bg-slate-50 dark:bg-slate-900/50'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${isDone ? 'bg-emerald-200 text-emerald-700' : 'bg-indigo-100 text-indigo-600'}`}>
                        {challenge.structure.replace('_', ' ')}
                      </span>
                      {isDone && <CheckCircle2 size={14} className="text-emerald-500" />}
                    </div>
                    <h5 className="font-bold text-sm mb-1">{challenge.title}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {challenge.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-amber-600 font-bold text-xs">
                        <Zap size={14} className="mr-1 fill-amber-600" /> +{challenge.xp} XP
                      </div>
                      {!isDone && (
                        <Button
                          variant="link"
                          className="h-auto p-0 text-indigo-600 font-bold text-xs hover:text-indigo-700"
                          onClick={() => completeChallenge(challenge.id, challenge.xp)}
                        >
                          Launch Challenge <ChevronRight size={14} className="ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Achievement Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-100">
          <Award size={20} className="text-amber-500" />
          <h4 className="font-bold text-lg">Unlocked Badges</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {completedChallenges.length > 0 ? (
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center border border-indigo-100 dark:border-indigo-800/50 shadow-sm transition-transform hover:scale-110">
               <Award size={24} className="text-indigo-600" />
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No badges earned yet. Complete challenges to unlock!</p>
          )}
        </div>
      </div>
    </div>
  );
};
