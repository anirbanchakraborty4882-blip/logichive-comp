import React, { useState } from 'react';
import { 
  Users, CheckCircle2, XCircle, Clock, BarChart2, Upload, 
  Search, RefreshCw, FileSpreadsheet, Archive, Eye, UserPlus
} from 'lucide-react';
import { EmployeeProfile, AdminStats } from '../types';
import { 
  getAllEmployees, getAdminStats, exportResultsCSV, exportResultsJSON, 
  importResultsJSON, resetAllData, saveEmployeeToAllRecords 
} from '../utils/storage';
import { downloadStandaloneLmsZip } from '../utils/zipGenerator';

interface AdminDashboardProps {
  onSelectEmployeeToTest: (profile: EmployeeProfile) => void;
  onBackToLms: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onSelectEmployeeToTest,
  onBackToLms
}) => {
  const [employees, setEmployees] = useState<EmployeeProfile[]>(getAllEmployees());
  const [stats, setStats] = useState<AdminStats>(getAdminStats());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedEmployeeModal, setSelectedEmployeeModal] = useState<EmployeeProfile | null>(null);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpId, setNewEmpId] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('Engineering');
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);

  const refreshData = () => {
    const updated = getAllEmployees();
    setEmployees(updated);
    setStats(getAdminStats());
  };

  const handleCsvExport = () => {
    exportResultsCSV();
  };

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importResultsJSON(content);
        if (success) {
          refreshData();
          alert('Employee compliance records imported successfully!');
        } else {
          alert('Failed to parse JSON backup file. Please ensure valid format.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadZip = async () => {
    setIsExportingZip(true);
    try {
      await downloadStandaloneLmsZip();
    } catch (err) {
      console.error('Error bundling ZIP:', err);
      alert('Failed to generate offline ZIP package.');
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all training records back to initial seeds? This action cannot be undone.')) {
      resetAllData();
      refreshData();
    }
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim() || !newEmpId.trim()) return;

    const newProfile: EmployeeProfile = {
      employeeId: newEmpId.trim().toUpperCase(),
      name: newEmpName.trim(),
      email: `${newEmpName.trim().toLowerCase().replace(/\s+/g, '.')}@logichive.com`,
      department: newEmpDept,
      currentModuleIndex: 0,
      moduleLearningChecksPassed: {},
      attempts: [],
      status: 'NOT_STARTED',
      bestScorePercentage: 0,
      latestScorePercentage: 0
    };

    saveEmployeeToAllRecords(newProfile);
    refreshData();
    setNewEmpName('');
    setNewEmpId('');
    setShowAddEmpModal(false);
  };

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.department && emp.department.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && emp.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Administrator & Trainer Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            LogicHive Compliance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time compliance logs & scores for approximately 30 active employees.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddEmpModal(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-sm cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Employee</span>
          </button>

          <button
            onClick={handleCsvExport}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md shadow-blue-200 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isExportingZip}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center space-x-1.5 border border-slate-300 cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5 text-blue-600" />
            <span>{isExportingZip ? 'Bundling Zip...' : 'Offline Zip Package'}</span>
          </button>

          <label className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleJsonImport} className="hidden" />
          </label>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Staff</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl font-black text-slate-900">{stats.totalEmployees}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Target: 30 Profiles</span>
        </div>

        <div className="bg-green-50/70 p-4 rounded-2xl border border-green-200 shadow-2xs">
          <div className="flex items-center justify-between text-green-800 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Passed</span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-2xl font-black text-green-900">{stats.passedCount}</span>
          <span className="text-[10px] font-bold text-green-700 block mt-0.5">Score &gt; 90%</span>
        </div>

        <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 shadow-2xs">
          <div className="flex items-center justify-between text-rose-800 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Failed</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl font-black text-rose-900">{stats.failedCount}</span>
          <span className="text-[10px] font-bold text-rose-700 block mt-0.5">Retake Required</span>
        </div>

        <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 shadow-2xs">
          <div className="flex items-center justify-between text-sky-800 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-2xl font-black text-sky-900">{stats.inProgressCount}</span>
          <span className="text-[10px] text-sky-700 block mt-0.5">Active Modules</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Not Started</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl font-black text-slate-800">{stats.notStartedCount}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Pending</span>
        </div>

        <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 shadow-2xs">
          <div className="flex items-center justify-between text-blue-900 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pass Rate</span>
            <BarChart2 className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-blue-950">{stats.passRate}%</span>
          <span className="text-[10px] font-bold text-blue-700 block mt-0.5">Avg Score: {stats.averageScore}%</span>
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Name, ID, or Dept..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto text-xs">
            {['ALL', 'PASSED', 'FAILED', 'IN_PROGRESS', 'NOT_STARTED'].map((statusKey) => (
              <button
                key={statusKey}
                onClick={() => setStatusFilter(statusKey)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === statusKey
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {statusKey.replace('_', ' ')}
              </button>
            ))}
          </div>

        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Attempts</th>
                <th className="py-3 px-4 text-center">Best Score</th>
                <th className="py-3 px-4 text-center">Latest Score</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Completion Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 font-semibold">
                    No matching employee records found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.employeeId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-800">{emp.employeeId}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{emp.name}</td>
                    <td className="py-3 px-4 text-slate-600">{emp.department || 'General'}</td>
                    <td className="py-3 px-4 text-center font-bold">{emp.attempts ? emp.attempts.length : 0}</td>
                    <td className="py-3 px-4 text-center font-extrabold text-slate-900">{emp.bestScorePercentage}%</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700">{emp.latestScorePercentage}%</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        emp.status === 'PASSED'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : emp.status === 'FAILED'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : emp.status === 'IN_PROGRESS'
                          ? 'bg-sky-100 text-sky-800 border border-sky-300'
                          : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">
                      {emp.completionDate ? new Date(emp.completionDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedEmployeeModal(emp)}
                        title="View Attempt Logs"
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer inline-block"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onSelectEmployeeToTest(emp)}
                        title="Simulate Employee Session"
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded font-bold text-[10px] border border-blue-200 cursor-pointer inline-block"
                      >
                        Launch
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredEmployees.length} of {employees.length} Employees</span>
          <button
            onClick={handleResetData}
            className="text-rose-600 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Seeds</span>
          </button>
        </div>

      </div>

      {/* Employee Attempts History Modal */}
      {selectedEmployeeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{selectedEmployeeModal.name}</h3>
                <p className="text-xs text-slate-500 font-mono">ID: {selectedEmployeeModal.employeeId} | {selectedEmployeeModal.department}</p>
              </div>
              <button
                onClick={() => setSelectedEmployeeModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assessment Attempt History</h4>
              
              {selectedEmployeeModal.attempts.length === 0 ? (
                <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-lg text-center font-medium">
                  No final assessment attempts recorded yet.
                </p>
              ) : (
                selectedEmployeeModal.attempts.map((att, idx) => (
                  <div key={att.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">Attempt #{idx + 1}</span>
                      <span className="text-slate-500 text-[11px]">{new Date(att.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm text-slate-900 block">{att.scorePercentage}%</span>
                      <span className={`font-bold ${att.passed ? 'text-green-600' : 'text-rose-600'}`}>
                        {att.passed ? 'PASSED ✓' : 'FAILED ✗'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedEmployeeModal(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Logs
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddEmpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add New Employee Profile</h3>
            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                  placeholder="e.g. Alex Turner"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee ID *</label>
                <input
                  type="text"
                  required
                  value={newEmpId}
                  onChange={(e) => setNewEmpId(e.target.value)}
                  placeholder="e.g. LH031"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department</label>
                <select
                  value={newEmpDept}
                  onChange={(e) => setNewEmpDept(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                  <option value="Information Security">Information Security</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Success">Customer Success</option>
                  <option value="Product Management">Product Management</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

