import React, { useState } from 'react';
import { Shield, UserPlus, LogIn, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { EmployeeProfile } from '../types';

interface WelcomeScreenProps {
  onStartTraining: (name: string, email: string, department: string) => void;
  existingUsers: EmployeeProfile[];
  onSelectExistingUser: (user: EmployeeProfile) => void;
  onOpenAdmin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartTraining,
  existingUsers,
  onSelectExistingUser,
  onOpenAdmin
}) => {
  const [mode, setMode] = useState<'register' | 'resume'>('register');
  
  // Registration state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Engineering');
  
  // Resume state
  const [resumeEmail, setResumeEmail] = useState('');
  const [resumeError, setResumeError] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const trimmedEmail = email.trim().toLowerCase();
    
    // Check if employee with this email already registered
    const matched = existingUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (matched) {
      onSelectExistingUser(matched);
      return;
    }

    onStartTraining(name.trim(), trimmedEmail, department);
  };

  const handleResumeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeEmail.trim()) return;

    const trimmedEmail = resumeEmail.trim().toLowerCase();
    const matched = existingUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (matched) {
      setResumeError('');
      onSelectExistingUser(matched);
    } else {
      setResumeError('No registered record found for this company email. Please register as a new employee.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>LogicHive Internal Corporate LMS</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          LogicHive Compliance Awareness Training
        </h1>
        <p className="mt-2 text-base sm:text-lg font-medium text-slate-600">
          Information Security • Quality Management • Ethics • Workplace Responsibility
        </p>
      </div>

      {/* Main Grid Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Employee Self-Registration & Login Form */}
        <div className="md:col-span-7 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between">
          <div>
            
            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => { setMode('register'); setResumeError(''); }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>New Registration</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('resume'); setResumeError(''); }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  mode === 'resume'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Resume Session</span>
              </button>
            </div>

            {/* Registration Form */}
            {mode === 'register' ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h2 className="text-lg font-bold text-slate-900">Employee Self-Registration</h2>
                  <p className="text-xs text-slate-500">Register with your full name and official company email address.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anirban Chakraborty"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. anirban@logichive.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Information Security">Information Security</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Operations">Operations</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Legal & Compliance">Legal & Compliance</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!name.trim() || !email.trim()}
                  className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-200 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Register & Start Training</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Resume Session Form */
              <form onSubmit={handleResumeSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h2 className="text-lg font-bold text-slate-900">Resume Training Session</h2>
                  <p className="text-xs text-slate-500">Enter your registered company email to restore your training progress.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registered Company Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={resumeEmail}
                    onChange={(e) => {
                      setResumeEmail(e.target.value);
                      setResumeError('');
                    }}
                    placeholder="e.g. employee@logichive.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                {resumeError && (
                  <div className="flex items-start space-x-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{resumeError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!resumeEmail.trim()}
                  className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-200 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Resume My Training</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Administrator View?</span>
            <button
              onClick={onOpenAdmin}
              className="font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Open Admin Dashboard →
            </button>
          </div>
        </div>

        {/* Right Side: Training Overview & Rules */}
        <div className="md:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Training Overview & Rules</span>
            </div>

            <h3 className="text-lg font-bold mb-3 text-slate-100">Mandatory Annual Refresher</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              This course covers essential company compliance mandates based on the official LogicHive presentation. Completing this training is mandatory for all employees.
            </p>

            {/* Modules List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>TryHackMe Style Modules</strong>: Read top topic summaries & answer bottom knowledge checks.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>10 Core Topics</strong> covering InfoSec, Quality, Ethics, POSH, & Workspace Hygiene.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>25-Question Final Exam</strong> testing all training topics at the end.</span>
              </div>
            </div>

            {/* Passing Score Callout */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-200">
              <div className="flex items-center space-x-2 font-bold text-sm text-amber-300 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Passing Requirement</span>
              </div>
              <p className="text-xs leading-relaxed">
                A final assessment score strictly <strong>GREATER than 90%</strong> (91% or higher) is required to pass and earn certification. Retakes are mandatory if 90% or lower is scored.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>LogicHive ISO 27001 / ISO 9001</span>
            <span>Version 2026.1</span>
          </div>

        </div>

      </div>

    </div>
  );
};
