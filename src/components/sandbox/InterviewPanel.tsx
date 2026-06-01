'use client';

import React, { useState } from 'react';
import { INTERVIEW_QUESTIONS } from '@/data/interviewQuestions';
import { HelpCircle, CheckCircle, XCircle, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const InterviewPanel: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = INTERVIEW_QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / INTERVIEW_QUESTIONS.length) * 100;

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-600">
          <HelpCircle size={20} />
          <h3 className="font-bold text-lg">Interview Prep</h3>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
          <Trophy size={14} className="text-amber-500" />
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Score: {score}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
          <span>Question {currentIdx + 1} of {INTERVIEW_QUESTIONS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <Card className="p-6 border-none bg-slate-50 dark:bg-slate-900/50 shadow-inner">
        <h4 className="text-sm font-bold leading-relaxed mb-6">
          {question.text}
        </h4>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm ${
                showResult
                  ? i === question.correctAnswer
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : i === selectedAnswer
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                    : 'border-transparent opacity-50'
                  : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-indigo-500 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && i === question.correctAnswer && <CheckCircle size={16} className="text-emerald-500" />}
                {showResult && i === selectedAnswer && i !== question.correctAnswer && <XCircle size={16} className="text-rose-500" />}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
            <h5 className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Explanation</h5>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed">
              {question.explanation}
            </p>
            <Button onClick={nextQuestion} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
              Next Question <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
