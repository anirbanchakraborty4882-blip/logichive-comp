import React, { useState, useEffect } from 'react';
import { EmployeeProfile, AssessmentAttempt } from './types';
import { TRAINING_MODULES } from './data/trainingModules';
import { 
  getStoredCurrentUser, saveCurrentUserProfile, saveEmployeeProfile, 
  recordAssessmentAttempt, getAllEmployees, clearCurrentUser 
} from './utils/storage';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { EmployeeSummaryDashboard } from './components/EmployeeSummaryDashboard';
import { SlideViewer } from './components/SlideViewer';
import { FinalAssessment } from './components/FinalAssessment';
import { ResultScreen } from './components/ResultScreen';
import { Certificate } from './components/Certificate';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<EmployeeProfile | null>(getStoredCurrentUser());
  const [activeView, setActiveView] = useState<'welcome' | 'summary' | 'training' | 'assessment' | 'result' | 'admin' | 'cert'>(
    currentUser ? 'summary' : 'welcome'
  );
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(
    currentUser ? currentUser.currentModuleIndex || 0 : 0
  );
  const [latestAttempt, setLatestAttempt] = useState<AssessmentAttempt | null>(
    currentUser && currentUser.attempts.length > 0
      ? currentUser.attempts[currentUser.attempts.length - 1]
      : null
  );

  // Keep state synced with localStorage
  useEffect(() => {
    if (currentUser) {
      saveCurrentUserProfile(currentUser);
    }
  }, [currentUser]);

  const handleStartTraining = (name: string, email: string, department: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = getAllEmployees().find((e) => e.email && e.email.toLowerCase() === trimmedEmail);
    
    let profile: EmployeeProfile;
    if (existing) {
      profile = {
        ...existing,
        name: name,
        department: department || existing.department
      };
    } else {
      const autoId = `LH-${Math.floor(1000 + Math.random() * 9000)}`;
      profile = {
        employeeId: autoId,
        name: name,
        email: trimmedEmail,
        department: department || 'Engineering',
        currentModuleIndex: 0,
        moduleLearningChecksPassed: {},
        attempts: [],
        status: 'IN_PROGRESS',
        bestScorePercentage: 0,
        latestScorePercentage: 0,
        lastActiveDate: new Date().toISOString()
      };
    }

    setCurrentUser(profile);
    saveEmployeeProfile(profile);
    setCurrentModuleIndex(profile.currentModuleIndex || 0);
    
    if (profile.attempts.length > 0) {
      setLatestAttempt(profile.attempts[profile.attempts.length - 1]);
    }

    setActiveView('summary');
  };

  const handleSelectExistingUser = (profile: EmployeeProfile) => {
    setCurrentUser(profile);
    saveCurrentUserProfile(profile);
    setCurrentModuleIndex(profile.currentModuleIndex || 0);
    if (profile.attempts.length > 0) {
      setLatestAttempt(profile.attempts[profile.attempts.length - 1]);
    }
    setActiveView('summary');
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    setActiveView('welcome');
  };

  const handleLearningCheckAnswered = (moduleId: number, isCorrect: boolean) => {
    if (!currentUser) return;

    const updatedChecks = {
      ...currentUser.moduleLearningChecksPassed,
      [moduleId]: isCorrect
    };

    const updatedProfile: EmployeeProfile = {
      ...currentUser,
      moduleLearningChecksPassed: updatedChecks,
      status: currentUser.status === 'NOT_STARTED' ? 'IN_PROGRESS' : currentUser.status
    };

    setCurrentUser(updatedProfile);
    saveEmployeeProfile(updatedProfile);
  };

  const handleNextSlide = () => {
    if (currentModuleIndex < TRAINING_MODULES.length - 1) {
      const nextIdx = currentModuleIndex + 1;
      setCurrentModuleIndex(nextIdx);

      if (currentUser) {
        const updatedProfile = {
          ...currentUser,
          currentModuleIndex: nextIdx,
          status: currentUser.status === 'NOT_STARTED' ? 'IN_PROGRESS' : currentUser.status
        };
        setCurrentUser(updatedProfile);
        saveEmployeeProfile(updatedProfile);
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentModuleIndex > 0) {
      const prevIdx = currentModuleIndex - 1;
      setCurrentModuleIndex(prevIdx);
    }
  };

  const handleCompleteAssessment = (
    scorePercentage: number,
    correctCount: number,
    totalCount: number,
    userAnswers: Record<string, number>
  ) => {
    if (!currentUser) return;

    // Strict rule: pass if score > 90%
    const isPassed = scorePercentage > 90;

    const attempt: AssessmentAttempt = {
      id: `att_${currentUser.employeeId}_${Date.now()}`,
      timestamp: new Date().toISOString(),
      scorePercentage,
      correctAnswersCount: correctCount,
      totalQuestions: totalCount,
      passed: isPassed,
      answers: userAnswers
    };

    const updatedProfile = recordAssessmentAttempt(currentUser.employeeId, attempt);
    setCurrentUser(updatedProfile);
    setLatestAttempt(attempt);
    setActiveView('result');
  };

  const handleRetakeAssessment = () => {
    setActiveView('assessment');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <div>
        <Header
          currentUser={currentUser}
          activeView={activeView}
          onNavigate={(view) => setActiveView(view)}
          onLogout={handleLogout}
          currentModuleIndex={currentModuleIndex}
          totalModules={TRAINING_MODULES.length}
        />

        <main className="pb-12">
          {activeView === 'welcome' && (
            <WelcomeScreen
              onStartTraining={handleStartTraining}
              existingUsers={getAllEmployees()}
              onSelectExistingUser={handleSelectExistingUser}
              onOpenAdmin={() => setActiveView('admin')}
            />
          )}

          {activeView === 'summary' && currentUser && (
            <EmployeeSummaryDashboard
              currentUser={currentUser}
              onStartModule={(idx) => {
                setCurrentModuleIndex(idx);
                setActiveView('training');
              }}
              onStartAssessment={() => setActiveView('assessment')}
              onViewCertificate={() => setActiveView('cert')}
              onLogout={handleLogout}
            />
          )}

          {activeView === 'training' && currentUser && (
            <SlideViewer
              module={TRAINING_MODULES[currentModuleIndex]}
              moduleIndex={currentModuleIndex}
              totalModules={TRAINING_MODULES.length}
              onNextSlide={handleNextSlide}
              onPrevSlide={handlePrevSlide}
              onLearningCheckAnswered={handleLearningCheckAnswered}
              onStartFinalAssessment={() => setActiveView('assessment')}
              isLastSlide={currentModuleIndex === TRAINING_MODULES.length - 1}
            />
          )}

          {activeView === 'assessment' && currentUser && (
            <FinalAssessment
              onCompleteAssessment={handleCompleteAssessment}
            />
          )}

          {activeView === 'result' && currentUser && latestAttempt && (
            <ResultScreen
              currentUser={currentUser}
              latestAttempt={latestAttempt}
              onRetakeAssessment={handleRetakeAssessment}
              onReviewTraining={() => setActiveView('training')}
              onViewCertificate={() => setActiveView('cert')}
            />
          )}

          {activeView === 'cert' && currentUser && (
            <Certificate
              currentUser={currentUser}
              onBackToLms={() => setActiveView('training')}
            />
          )}

          {activeView === 'admin' && (
            <AdminDashboard
              onSelectEmployeeToTest={(emp) => {
                setCurrentUser(emp);
                saveCurrentUserProfile(emp);
                setCurrentModuleIndex(emp.currentModuleIndex || 0);
                setActiveView('training');
              }}
              onBackToLms={() => setActiveView(currentUser ? 'training' : 'welcome')}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 LogicHive Technologies. Internal Compliance Awareness LMS.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>ISO 27001 & ISO 9001 Compliant</span>
            <span>Passing Rule: &gt; 90% Score Required</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
