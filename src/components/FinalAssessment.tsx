import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Send, FileCheck } from 'lucide-react';
import { Question } from '../types';
import { FINAL_ASSESSMENT_QUESTIONS } from '../data/finalAssessmentQuestions';

interface FinalAssessmentProps {
  onCompleteAssessment: (
    scorePercentage: number,
    correctCount: number,
    totalCount: number,
    userAnswers: Record<string, number>
  ) => void;
}

export const FinalAssessment: React.FC<FinalAssessmentProps> = ({
  onCompleteAssessment
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Initialize and shuffle questions on mount
  useEffect(() => {
    // Shuffle options for each question, preserving correct answer index
    const shuffled = FINAL_ASSESSMENT_QUESTIONS.map((q) => {
      // Create options with original index
      const optionsWithOrig = q.options.map((opt, i) => ({ text: opt, origIndex: i }));
      // Fisher-Yates shuffle
      for (let i = optionsWithOrig.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithOrig[i], optionsWithOrig[j]] = [optionsWithOrig[j], optionsWithOrig[i]];
      }
      const newOptions = optionsWithOrig.map((o) => o.text);
      const newCorrectIndex = optionsWithOrig.findIndex((o) => o.origIndex === q.correctAnswer);

      return {
        ...q,
        options: newOptions,
        correctAnswer: newCorrectIndex
      };
    });

    setQuestions(shuffled);
  }, []);

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Assessment Questions...</div>;
  }

  const currentQ = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / totalQ) * 100);
    onCompleteAssessment(scorePct, correct, totalQ, userAnswers);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      
      {/* Assessment Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Final Compliance Exam</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              LogicHive Compliance Assessment
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Answer all 25 randomized policy questions. Passing threshold: score of <strong>90% or higher</strong> (score &ge; 90%).
            </p>
          </div>

          <div className="bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 text-center shrink-0">
            <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Answered Progress</span>
            <span className="text-lg font-black text-blue-400">{answeredCount} / {totalQ}</span>
          </div>
        </div>

        {/* Question Numbers Stepper */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-1.5 justify-center sm:justify-start">
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 font-extrabold'
                    : isAnswered
                    ? 'bg-green-950 text-green-300 border border-green-600/50'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Question {currentIdx + 1} of {totalQ}
          </span>
          {currentQ.category && (
            <span className="text-xs font-semibold text-slate-500">
              Topic: {currentQ.category}
            </span>
          )}
        </div>

        <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((optText, optIdx) => {
            const isSelected = userAnswers[currentQ.id] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start space-x-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold ring-1 ring-blue-600 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <span className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1 mt-0.5">{optText.replace(/^[A-D]\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Assessment Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-2 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentIdx < totalQ - 1 ? (
          <button
            onClick={() => setCurrentIdx((prev) => Math.min(totalQ - 1, prev + 1))}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-green-200"
          >
            <Send className="w-4 h-4" />
            <span>Submit Final Assessment</span>
          </button>
        )}
      </div>

      {/* Submission Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
              <FileCheck className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Ready to Submit Assessment?</h3>
              <p className="text-xs text-slate-600 mt-1">
                You have answered <strong>{answeredCount}</strong> out of <strong>{totalQ}</strong> questions.
              </p>
              {answeredCount < totalQ && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-semibold text-left flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>Warning: You have {totalQ - answeredCount} unanswered questions which will be marked as incorrect.</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="py-2.5 px-4 border border-slate-300 rounded-xl font-bold text-slate-700 text-xs hover:bg-slate-50 cursor-pointer"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmit}
                className="py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Yes, Calculate Score
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

