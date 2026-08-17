import React from 'react';

interface LogoutProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const Logout: React.FC<LogoutProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="max-w-lg mx-auto mt-16 bg-white rounded-2xl border p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-3">Confirm Logout</h2>
      <p className="text-sm text-slate-600 mb-4">You are about to sign out of the LogicHive Compliance LMS. Your progress is saved to your profile. Do you want to continue?</p>

      <div className="flex items-center space-x-3">
        <button
          onClick={onConfirm}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg"
        >
          Logout
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
