import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, XCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { EmployeeProfile, AssessmentAttempt } from '../types';

interface ResultScreenProps {
  currentUser: EmployeeProfile;
  latestAttempt: AssessmentAttempt;
  onRetakeAssessment: () => void;
  onReviewTraining: () => void;
  onViewCertificate: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  currentUser,
  latestAttempt,
  onRetakeAssessment,
  onReviewTraining,
  onViewCertificate
}) => {
  const isPassed = latestAttempt.passed; // true if scorePercentage > 90

  useEffect(() => {
    if (isPassed) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti effect failed:', err);
      }
    }
  }, [isPassed]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      
      {/* Result Card */}
      <div className={`bg-white rounded-2xl border shadow-sm p-6 sm:p-10 text-center space-y-6 ${
        isPassed ? 'border-green-300 ring-1 ring-green-500/20' : 'border-rose-300 ring-1 ring-rose-500/20'
      }`}>
        
        {/* Pass/Fail Icon Badge */}
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto ${
          isPassed ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          {isPassed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
        </div>

        {/* Title Banner */}
        <div>
          <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2 ${
            isPassed ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {isPassed ? 'CONGRATULATIONS — TRAINING COMPLETED' : 'ASSESSMENT RESULT: NOT PASSED'}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Final Score: {latestAttempt.scorePercentage}%
          </h1>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Correct Answers: {latestAttempt.correctAnswersCount} / {latestAttempt.totalQuestions} Questions
          </p>
        </div>

        {/* Notice Message */}
        {isPassed ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-900 text-sm font-medium">
            <p className="font-bold text-green-800 mb-1">✓ Certification Unlocked!</p>
            You have successfully achieved a score of 90% or higher and completed the LogicHive Compliance Awareness Training requirement.
          </div>
        ) : (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-sm font-medium space-y-1">
            <p className="font-bold text-rose-800 flex items-center justify-center space-x-1">
              <AlertCircle className="w-4 h-4 text-rose-600 inline mr-1" />
              <span>Score Threshold Not Met (Required: 90% or higher)</span>
            </p>
            <p className="text-xs text-rose-800 leading-relaxed">
              You scored {latestAttempt.scorePercentage}%. Minimum required passing score is 90%. Please review the training material and retake the assessment.
            </p>
          </div>
        )}

        {/* Employee Details Summary Table */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs sm:text-sm text-slate-700 space-y-2">
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="font-bold text-slate-500">Employee Name:</span>
            <span className="font-extrabold text-slate-900">{currentUser.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="font-bold text-slate-500">Employee ID:</span>
            <span className="font-mono font-bold text-slate-900">{currentUser.employeeId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="font-bold text-slate-500">Total Attempts:</span>
            <span className="font-bold text-slate-900">{currentUser.attempts.length}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="font-bold text-slate-500">Required Passing Threshold:</span>
            <span className="font-bold text-slate-900">90% or higher (&ge; 90%)</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-slate-500">Compliance Status:</span>
            <span className={`font-black uppercase tracking-wider ${
              isPassed ? 'text-green-700' : 'text-rose-700'
            }`}>
              {isPassed ? 'COMPLETED (PASSED)' : 'FAILED (RETAKE REQUIRED)'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {isPassed ? (
            <>
              <button
                onClick={onViewCertificate}
                className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-md shadow-green-200 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>View & Download Certificate</span>
              </button>
              <button
                onClick={onReviewTraining}
                className="w-full sm:w-auto px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Review Training Modules
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRetakeAssessment}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-200 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Assessment Now</span>
              </button>
              <button
                onClick={onReviewTraining}
                className="w-full sm:w-auto px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Review Modules First
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
};

