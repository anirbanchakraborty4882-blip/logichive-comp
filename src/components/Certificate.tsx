import React from 'react';
import { ShieldCheck, Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { EmployeeProfile } from '../types';

interface CertificateProps {
  currentUser: EmployeeProfile;
  onBackToLms: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({
  currentUser,
  onBackToLms
}) => {
  const completionDateFormatted = currentUser.completionDate
    ? new Date(currentUser.completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  const verificationCode = `LH-CERT-${currentUser.employeeId}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Action Bar (hidden during print) */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={onBackToLms}
          className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to LMS</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-md shadow-blue-200 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Certificate Frame */}
      <div className="bg-white rounded-2xl border-8 border-double border-slate-900 p-8 sm:p-12 text-center shadow-xl relative overflow-hidden space-y-6 print:border-4 print:p-6 print:shadow-none">
        
        {/* Background Watermark/Accent */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">LogicHive</span>
          </div>
          <p className="text-xs font-extrabold tracking-widest text-blue-700 uppercase">
            Official Corporate Certificate of Completion
          </p>
        </div>

        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto rounded-full" />

        {/* Certificate Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Compliance Awareness Training
          </h1>
          <p className="text-xs font-semibold text-slate-500">
            Information Security • Quality Management • Business Conduct & Ethics • POSH
          </p>
        </div>

        {/* Recipient Line */}
        <div className="py-4 space-y-3">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">This is to certify that</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 border-b-2 border-blue-600 inline-block px-8 pb-2">
            {currentUser.name}
          </h2>
          <p className="text-xs font-bold text-slate-700">
            Employee ID: <span className="font-mono text-blue-700">{currentUser.employeeId}</span> {currentUser.department && `| Department: ${currentUser.department}`}
          </p>
        </div>

        {/* Statement Body */}
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          has successfully completed the <strong>LogicHive Compliance Awareness Training</strong> program and passed the official final assessment with a certified score meeting or exceeding the mandatory 90% threshold.
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Final Score</span>
            <span className="font-extrabold text-blue-700 text-sm sm:text-base">{currentUser.bestScorePercentage}%</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Compliance Status</span>
            <span className="font-extrabold text-green-600 text-sm sm:text-base flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 inline" />
              <span>PASSED</span>
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Date Issued</span>
            <span className="font-bold text-slate-800 text-xs sm:text-sm">{completionDateFormatted}</span>
          </div>
        </div>

        {/* Certificate Signatures & Seals */}
        <div className="pt-8 grid grid-cols-2 gap-8 max-w-xl mx-auto border-t border-slate-200">
          <div className="text-center">
            <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">Internal Compliance Committee</div>
            <div className="border-t border-slate-300 w-36 mx-auto pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">LogicHive Compliance Officer</span>
            </div>
          </div>

          <div className="text-center">
            <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">Human Resources & Quality</div>
            <div className="border-t border-slate-300 w-36 mx-auto pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Authorized HR Lead</span>
            </div>
          </div>
        </div>

        {/* Verification Code Footer */}
        <div className="pt-4 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100">
          <span>Verification ID: <span className="font-mono text-slate-600">{verificationCode}</span></span>
          <span>LogicHive ISO 27001 / ISO 9001 Certified System</span>
        </div>

      </div>

    </div>
  );
};

