import React from 'react';
import { 
  ShieldCheck, Award, BookOpen, CheckCircle2, Clock, 
  ArrowRight, Sparkles, AlertCircle, RotateCcw, FileText, UserCheck, Check, Lock
} from 'lucide-react';
import { EmployeeProfile } from '../types';
import { TRAINING_MODULES } from '../data/trainingModules';

interface EmployeeSummaryDashboardProps {
  currentUser: EmployeeProfile;
  onStartModule: (moduleIndex: number) => void;
  onStartAssessment: () => void;
  onViewCertificate: () => void;
  onLogout: () => void;
}

export const EmployeeSummaryDashboard: React.FC<EmployeeSummaryDashboardProps> = ({
  currentUser,
  onStartModule,
  onStartAssessment,
  onViewCertificate,
  onLogout
}) => {
  const isPassed = currentUser.status === 'PASSED';
  const hasAttempted = currentUser.attempts && currentUser.attempts.length > 0;
  const latestAttempt = hasAttempted ? currentUser.attempts[currentUser.attempts.length - 1] : null;

  // Calculate training completion (0 - 90% for modules, 100% ONLY if passed exam)
  const completedChecksCount = TRAINING_MODULES.filter(
    (m) => currentUser.moduleLearningChecksPassed?.[m.id]
  ).length;
  const currentTaskIdx = currentUser.currentModuleIndex || 0;
  
  let calculatedProgress = 0;
  if (isPassed) {
    calculatedProgress = 100;
  } else {
    // Cap modules progress at 90% max so 100% is reserved exclusively for passing the exam
    const taskRatio = (currentTaskIdx + 1) / TRAINING_MODULES.length;
    calculatedProgress = Math.min(90, Math.round(taskRatio * 90));
  }

  const allModulesRead = currentTaskIdx >= TRAINING_MODULES.length - 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      
      {/* Employee Profile & Welcome Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* User Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold tracking-wider uppercase">
                Employee Profile
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {currentUser.department}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>Corporate Email:</strong> {currentUser.email}</span>
              <span>•</span>
              <span><strong>Employee ID:</strong> <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300 font-mono">{currentUser.employeeId}</code></span>
            </p>
          </div>

          {/* Status Badge & Primary Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance Status</p>
              <div className="flex items-center space-x-2">
                {isPassed ? (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CERTIFIED (Passed Exam)</span>
                  </span>
                ) : hasAttempted ? (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-black text-amber-400 bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>EXAM RETAKE REQUIRED</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-black text-blue-300 bg-blue-950/80 px-3 py-1 rounded-lg border border-blue-800">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>IN TRAINING</span>
                  </span>
                )}
              </div>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-700 pt-3 sm:pt-0 sm:pl-4 flex items-center">
              {isPassed ? (
                <button
                  onClick={onViewCertificate}
                  className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              ) : (
                <button
                  onClick={() => onStartModule(currentTaskIdx)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{allModulesRead ? 'Review Training Modules' : `Continue Task ${currentTaskIdx + 1}`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Overall Progress Meter */}
        <div className="mt-6 pt-6 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Overall Compliance Progress</span>
            </span>
            <span className={isPassed ? 'text-emerald-400 font-extrabold' : 'text-blue-400 font-extrabold'}>
              {calculatedProgress}% {isPassed ? 'Complete (Passed)' : '(100% requires passing Final Exam)'}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700 p-0.5">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isPassed ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-blue-500'
              }`}
              style={{ width: `${calculatedProgress}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400">
            * Note: Training modules account for up to 90% progress. Achieving 100% completion strictly requires passing the 25-question Final Assessment Exam with a score &ge; 90%.
          </p>
        </div>

      </div>

      {/* Grid: Left - Interactive Modules Summary, Right - Final Assessment & Exam Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Training Modules Overview */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Training Modules Summary (Interactive)</span>
              </h2>
              <p className="text-xs text-slate-500">
                10 core compliance topics with top summaries & knowledge checks
              </p>
            </div>
            
            <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
              {completedChecksCount} / {TRAINING_MODULES.length} Knowledge Checks Passed
            </span>
          </div>

          {/* Module Cards Grid */}
          <div className="space-y-3">
            {TRAINING_MODULES.map((m, idx) => {
              const isCurrent = idx === currentTaskIdx;
              const isCompleted = idx < currentTaskIdx || isPassed;
              const isCheckPassed = currentUser.moduleLearningChecksPassed?.[m.id];

              return (
                <div 
                  key={m.id}
                  onClick={() => onStartModule(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isCurrent 
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                      : isCompleted
                      ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      : 'bg-slate-50 border-slate-200 opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : `T${idx + 1}`}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {m.category}
                        </span>
                        {isCheckPassed && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                            Check Passed ✓
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {m.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {m.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartModule(idx);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isCurrent ? 'Study Task →' : 'View Task'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 cols): Final Assessment Status & Exam Action Box */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Exam Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center space-x-2.5 text-slate-900 font-extrabold">
              <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h3 className="text-base font-bold leading-tight">Final Assessment Exam</h3>
                <p className="text-xs text-slate-500">25 Multiple Choice Questions</p>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5 text-xs text-amber-900">
              <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Passing Criteria: 90% or higher</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                You must score 90% or higher (e.g., 23 out of 25 = 92% or higher) to pass the course and earn official certification.
              </p>
            </div>

            {/* Exam Attempts History if attempted */}
            {hasAttempted && latestAttempt && (
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-2">
                  <span className="text-slate-700">Latest Exam Result</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
                    latestAttempt.passed 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {latestAttempt.passed ? 'PASSED ✓' : 'FAILED ✗'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Score</p>
                    <p className={`text-lg font-black ${latestAttempt.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {latestAttempt.scorePercentage}%
                    </p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Correct Answers</p>
                    <p className="text-lg font-black text-slate-800">
                      {latestAttempt.correctAnswersCount} / {latestAttempt.totalQuestions}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  Attempted on {new Date(latestAttempt.timestamp).toLocaleDateString()} at {new Date(latestAttempt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}

            {/* Exam Launch / Retake Button */}
            {isPassed ? (
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold">
                  ✓ You have successfully passed the LogicHive Compliance Certification!
                </div>
                <button
                  onClick={onViewCertificate}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-200 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View & Download Certificate</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onStartAssessment}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-200 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                {hasAttempted ? <RotateCcw className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                <span>{hasAttempted ? 'Retake Final Assessment Exam' : 'Take Final Assessment Exam'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>

          {/* Quick Support / Contact Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Need Compliance Help?</span>
            </h4>
            <p className="leading-relaxed">
              If you have any questions regarding information security, quality guidelines, or ethics policies, please reach out to HR or your manager.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
