import React, { useState } from 'react';
import { 
  ShieldCheck, Target, Award, BarChart3, Scale, AlertTriangle, Users, 
  Monitor, CheckSquare, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, 
  XCircle, AlertCircle, ArrowRight, Check, BookOpen, HelpCircle
} from 'lucide-react';
import { TrainingModule } from '../types';
import { TRAINING_MODULES } from '../data/trainingModules';

interface SlideViewerProps {
  module: TrainingModule;
  moduleIndex: number;
  totalModules: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onLearningCheckAnswered: (moduleId: number, isCorrect: boolean) => void;
  onStartFinalAssessment: () => void;
  isLastSlide: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-blue-600" />,
  Target: <Target className="w-5 h-5 text-blue-600" />,
  Award: <Award className="w-5 h-5 text-blue-600" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-blue-600" />,
  Scale: <Scale className="w-5 h-5 text-blue-600" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-blue-600" />,
  Users: <Users className="w-5 h-5 text-blue-600" />,
  Monitor: <Monitor className="w-5 h-5 text-blue-600" />,
  CheckSquare: <CheckSquare className="w-5 h-5 text-blue-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-blue-600" />
};

export const SlideViewer: React.FC<SlideViewerProps> = ({
  module,
  moduleIndex,
  totalModules,
  onNextSlide,
  onPrevSlide,
  onLearningCheckAnswered,
  onStartFinalAssessment,
  isLastSlide
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Reset MCQ state when module changes
  React.useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setValidationError('');
  }, [module.id]);

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      setValidationError('Please select an option before submitting.');
      return;
    }
    setValidationError('');
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === module.learningCheck.correctAnswer;
    onLearningCheckAnswered(module.id, isCorrect);
  };

  const handleNextClick = () => {
    if (!isAnswerSubmitted) {
      setValidationError('Please answer and submit the Knowledge Check question below before moving to the next task.');
      return;
    }
    setValidationError('');
    if (isLastSlide) {
      onStartFinalAssessment();
    } else {
      onNextSlide();
    }
  };

  const completedCount = moduleIndex; // completed up to current
  // Modules account for up to 90% of total course progress (100% requires passing the exam)
  const progressPercentage = Math.min(90, Math.round(((moduleIndex + 1) / totalModules) * 90));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      
      {/* Module Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              {ICON_MAP[module.iconName] || <ShieldCheck className="w-6 h-6 text-blue-400" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                  Task {moduleIndex + 1} of {totalModules}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
                  {module.category}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight mt-1">
                {module.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0 self-start md:self-auto">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Task Progress</p>
              <p className="text-sm font-black text-blue-400">{progressPercentage}% Complete</p>
            </div>
            <div className="w-28 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task Selector Navigation Bar */}
        <div className="pt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {TRAINING_MODULES.map((m, idx) => {
            const isCompleted = idx < moduleIndex;
            const isCurrent = idx === moduleIndex;
            return (
              <div 
                key={m.id} 
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                  isCurrent 
                    ? 'bg-blue-600 text-white font-bold shadow-sm ring-1 ring-blue-400'
                    : isCompleted
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-800'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 text-[10px] flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                )}
                <span className="truncate max-w-[110px]">Task {idx + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: Topic Overview & Summary ("Read & Learn") */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Topic Banner */}
        <div className="flex items-center space-x-2 text-blue-700 font-extrabold text-xs uppercase tracking-widest pb-2 border-b border-slate-100">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Topic Overview & Summary</span>
        </div>

        {/* Subtitle Callout Box */}
        <div className="p-4 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl">
          <h2 className="text-sm font-bold text-blue-900 mb-1">{module.subtitle}</h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {module.content.overview}
          </p>
        </div>

        {/* Key Points Summary List */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Core Concepts & Guidelines</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {module.content.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Policy Metrics & Targets Table if present */}
        {module.content.policiesOrTargets && (
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Policy Targets & Benchmarks
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {module.content.policiesOrTargets.map((item, idx) => (
                <div key={idx} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white">
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{item.label}</span>
                    {item.description && <p className="text-xs text-slate-500">{item.description}</p>}
                  </div>
                  <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-extrabold text-xs tracking-wide self-start sm:self-auto">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Do's and Don'ts if present */}
        {module.content.doAndDonts && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Do's */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Correct Ethical / Policy Practices</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-800">
                {module.content.doAndDonts.correct.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Incorrect Practices (Policy Violations)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-800">
                {module.content.doAndDonts.incorrect.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-rose-600 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Checklist if present */}
        {module.content.checklist && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Operational Requirements Checklist
            </h3>
            <div className="space-y-1.5">
              {module.content.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                  <div className="w-3.5 h-3.5 rounded border border-blue-600 bg-blue-50 flex items-center justify-center text-[10px] text-blue-700 font-bold">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* SECTION 2: Interactive Knowledge Check (Right Below Summary) */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-100 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              ?
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
                Task {moduleIndex + 1} — Knowledge Check Question
              </span>
              <p className="text-xs text-slate-500">Answer the question based on the topic summary above</p>
            </div>
          </div>

          {isAnswerSubmitted && (
            <span className={`px-3.5 py-1 rounded-full text-xs font-extrabold ${
              selectedOption === module.learningCheck.correctAnswer 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-rose-100 text-rose-800 border border-rose-200'
            }`}>
              {selectedOption === module.learningCheck.correctAnswer ? 'Task Answered Correctly ✓' : 'Incorrect Answer ✗'}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {module.learningCheck.question}
        </p>

        {/* Answer Options */}
        <div className="space-y-2.5">
          {module.learningCheck.options.map((optionText, optionIdx) => {
            let optionStyle = "bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/50";
            
            if (isAnswerSubmitted) {
              if (optionIdx === module.learningCheck.correctAnswer) {
                optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-400";
              } else if (optionIdx === selectedOption) {
                optionStyle = "bg-rose-50 border-rose-400 text-rose-900 font-semibold";
              } else {
                optionStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-60";
              }
            } else if (selectedOption === optionIdx) {
              optionStyle = "bg-blue-50 border-blue-600 text-blue-900 font-semibold ring-2 ring-blue-500";
            }

            return (
              <button
                key={optionIdx}
                disabled={isAnswerSubmitted}
                onClick={() => {
                  setSelectedOption(optionIdx);
                  setValidationError('');
                }}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer shadow-2xs ${optionStyle}`}
              >
                <div className="flex items-start space-x-3 min-w-0">
                  <span className="font-mono text-xs font-bold opacity-80 mt-0.5">{String.fromCharCode(65 + optionIdx)}.</span>
                  <span className="flex-1">{optionText.replace(/^[A-D]\.\s*/, '')}</span>
                </div>

                {isAnswerSubmitted && (
                  <div className="shrink-0 ml-2">
                    {optionIdx === module.learningCheck.correctAnswer && optionIdx === selectedOption && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-extrabold text-[11px] shadow-2xs">
                        ✓ Correct
                      </span>
                    )}
                    {optionIdx === selectedOption && optionIdx !== module.learningCheck.correctAnswer && (
                      <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-extrabold text-[11px] shadow-2xs">
                        ✗ Your Answer
                      </span>
                    )}
                    {optionIdx === module.learningCheck.correctAnswer && optionIdx !== selectedOption && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[11px]">
                        ✓ Correct Answer
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="flex items-center space-x-2 text-rose-700 text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit or Explanation Box */}
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-blue-200"
          >
            Submit Answer for Task {moduleIndex + 1}
          </button>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-xs uppercase tracking-wider text-blue-900">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Official Topic Explanation</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {module.learningCheck.explanation}
            </p>
          </div>
        )}

      </div>

      {/* Task Navigation Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrevSlide}
          disabled={moduleIndex === 0}
          className="px-5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-2 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Task</span>
        </button>

        <button
          onClick={handleNextClick}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all cursor-pointer shadow-md ${
            isLastSlide
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
          }`}
        >
          <span>{isLastSlide ? 'Start Final Assessment Exam' : 'Next Task'}</span>
          {isLastSlide ? <ArrowRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
