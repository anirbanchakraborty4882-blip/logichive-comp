import React from 'react';
import { ShieldCheck, Award, LogOut } from 'lucide-react';
import { EmployeeProfile } from '../types';

interface HeaderProps {
  currentUser: EmployeeProfile | null;
  activeView: 'welcome' | 'summary' | 'training' | 'assessment' | 'result' | 'admin' | 'cert';
  onNavigate: (view: 'welcome' | 'summary' | 'training' | 'assessment' | 'result' | 'admin' | 'cert') => void;
  onLogout: () => void;
  currentModuleIndex: number;
  totalModules: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeView,
  onNavigate,
  onLogout,
  currentModuleIndex,
  totalModules
}) => {
  const isPassed = currentUser?.status === 'PASSED';
  const progressPct = isPassed 
    ? 100 
    : Math.min(90, Math.round(((currentModuleIndex + 1) / totalModules) * 90));

  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => onNavigate(currentUser ? 'summary' : 'welcome')}
        >
          <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
            <div className="w-4 h-4 border-2 border-white rotate-45 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-white -rotate-45" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 whitespace-nowrap">LogicHive</span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 rounded border border-blue-200 flex-shrink-0 whitespace-nowrap">
                Compliance LMS
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block whitespace-nowrap">Internal Corporate Compliance Training</p>
          </div>
        </div>

        {/* Center Progress bar */}
        {currentUser && (activeView === 'training' || activeView === 'summary') && (
          <div className="hidden md:flex items-center space-x-3 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {activeView === 'training' 
                ? `Task ${currentModuleIndex + 1} of ${totalModules}` 
                : `Training Progress`}
            </span>
            <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${isPassed ? 'bg-emerald-600' : 'bg-blue-600'}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className={`text-xs font-bold ${isPassed ? 'text-emerald-600' : 'text-blue-600'}`}>
              {progressPct}% {isPassed ? '(Certified)' : ''}
            </span>
          </div>
        )}

        {/* Actions & User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* User Nav Options */}
          {currentUser && (
            <>
              <button
                onClick={() => onNavigate('summary')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'summary'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span className="hidden sm:inline">My Summary Dashboard</span>
              </button>

              <button
                onClick={() => onNavigate('training')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'training'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span className="hidden sm:inline">Training Tasks</span>
              </button>
            </>
          )}

          {/* Admin Dashboard Toggle */}
          <button
            onClick={() => onNavigate(activeView === 'admin' ? (currentUser ? 'summary' : 'welcome') : 'admin')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'admin'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
            }`}
          >
            <span className="hidden sm:inline">Admin View</span>
          </button>

          {currentUser && (
            <>
              {/* Certificate Quick Nav if Passed */}
              {currentUser.status === 'PASSED' && (
                <button
                  onClick={() => onNavigate('cert')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-green-600" />
                  <span className="hidden sm:inline">Certificate</span>
                </button>
              )}

              {/* Active User Badge */}
              <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">ID: {currentUser.employeeId}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs">
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                
                <button
                  onClick={onLogout}
                  title="Switch Employee / Logout"
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </header>
  );
};

