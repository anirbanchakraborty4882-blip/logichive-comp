import { EmployeeProfile, AssessmentAttempt, AdminStats } from '../types';
import { INITIAL_EMPLOYEES } from '../data/initialEmployees';

const CURRENT_USER_KEY = 'logichive_current_user_profile';
const ALL_EMPLOYEES_KEY = 'logichive_all_employees_data';
const MIGRATION_KEY = 'logichive_aarav_cleanup_v1';

export function runStartupDataMigration(): void {
  try {
    // Check and clean current user
    const currentRaw = localStorage.getItem(CURRENT_USER_KEY);
    if (currentRaw) {
      const parsed = JSON.parse(currentRaw);
      if (
        parsed &&
        (parsed.name?.toLowerCase().includes('aarav') ||
         parsed.email?.toLowerCase().includes('aarav') ||
         parsed.employeeId === 'LH001' ||
         parsed.name === 'Aarav Sharma')
      ) {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }

    // Check and clean all employees
    const allRaw = localStorage.getItem(ALL_EMPLOYEES_KEY);
    if (allRaw) {
      const parsedAll = JSON.parse(allRaw);
      if (Array.isArray(parsedAll)) {
        const cleaned = parsedAll.filter(
          (e: any) =>
            !(
              e.name?.toLowerCase().includes('aarav') ||
              e.email?.toLowerCase().includes('aarav') ||
              e.employeeId === 'LH001' ||
              e.name === 'Aarav Sharma'
            )
        );
        localStorage.setItem(ALL_EMPLOYEES_KEY, JSON.stringify(cleaned));
      }
    }

    localStorage.setItem(MIGRATION_KEY, 'true');
  } catch (err) {
    console.error('Error executing startup data migration:', err);
  }
}

// Run migration immediately on file import
runStartupDataMigration();

export function getStoredCurrentUser(): EmployeeProfile | null {
  try {
    runStartupDataMigration();
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    const profile: EmployeeProfile = JSON.parse(raw);
    if (
      profile.name?.toLowerCase().includes('aarav') ||
      profile.email?.toLowerCase().includes('aarav') ||
      profile.employeeId === 'LH001'
    ) {
      clearCurrentUser();
      return null;
    }
    return profile;
  } catch (err) {
    console.error('Error reading current user profile from localStorage:', err);
    return null;
  }
}

export function saveCurrentUserProfile(profile: EmployeeProfile): void {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
    saveEmployeeToAllRecords(profile);
  } catch (err) {
    console.error('Error saving current user profile:', err);
  }
}

export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getAllEmployees(): EmployeeProfile[] {
  try {
    runStartupDataMigration();
    const raw = localStorage.getItem(ALL_EMPLOYEES_KEY);
    if (!raw) {
      localStorage.setItem(ALL_EMPLOYEES_KEY, JSON.stringify(INITIAL_EMPLOYEES));
      return INITIAL_EMPLOYEES;
    }
    const stored: EmployeeProfile[] = JSON.parse(raw);
    const cleaned = stored.filter(
      (e) =>
        !(
          e.name?.toLowerCase().includes('aarav') ||
          e.email?.toLowerCase().includes('aarav') ||
          e.employeeId === 'LH001' ||
          e.name === 'Aarav Sharma'
        )
    );
    if (cleaned.length !== stored.length) {
      localStorage.setItem(ALL_EMPLOYEES_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (err) {
    console.error('Error reading all employees from localStorage:', err);
    return INITIAL_EMPLOYEES;
  }
}

export function saveEmployeeToAllRecords(profile: EmployeeProfile): void {
  try {
    const all = getAllEmployees();
    const index = all.findIndex(
      (e) =>
        e.email.toLowerCase() === profile.email.toLowerCase() ||
        e.employeeId.toUpperCase() === profile.employeeId.toUpperCase()
    );
    if (index >= 0) {
      all[index] = profile;
    } else {
      all.push(profile);
    }
    localStorage.setItem(ALL_EMPLOYEES_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Error saving employee to all records:', err);
  }
}

export function findEmployeeByEmailOrId(identifier: string): EmployeeProfile | null {
  const all = getAllEmployees();
  const clean = identifier.trim().toLowerCase();
  return (
    all.find(
      (e) => e.email.toLowerCase() === clean || e.employeeId.toLowerCase() === clean
    ) || null
  );
}

export function recordAssessmentAttempt(
  employeeIdOrEmail: string,
  attempt: AssessmentAttempt
): EmployeeProfile {
  const all = getAllEmployees();
  const clean = employeeIdOrEmail.trim().toLowerCase();
  let emp = all.find(
    (e) => e.email.toLowerCase() === clean || e.employeeId.toLowerCase() === clean
  );

  if (!emp) {
    emp = {
      employeeId: employeeIdOrEmail.toUpperCase(),
      name: 'Employee ' + employeeIdOrEmail,
      email: clean.includes('@') ? clean : `${clean}@logichive.internal`,
      department: 'General',
      currentModuleIndex: 0,
      moduleLearningChecksPassed: {},
      attempts: [],
      status: 'NOT_STARTED',
      bestScorePercentage: 0,
      latestScorePercentage: 0
    };
  }

  emp.attempts = [...emp.attempts, attempt];
  emp.latestScorePercentage = attempt.scorePercentage;
  emp.lastActiveDate = attempt.timestamp;

  if (attempt.scorePercentage > emp.bestScorePercentage) {
    emp.bestScorePercentage = attempt.scorePercentage;
  }

  // Strict PASS rule: score >= 90%
  const isPassed = attempt.scorePercentage >= 90;
  if (isPassed) {
    emp.status = 'PASSED';
    emp.completionDate = attempt.timestamp;
  } else {
    // If not passed previously, set to FAILED (retake required)
    if (emp.status !== 'PASSED') {
      emp.status = 'FAILED';
    }
  }

  saveEmployeeProfile(emp);
  return emp;
}

export function saveEmployeeProfile(profile: EmployeeProfile): void {
  saveCurrentUserProfile(profile);
}

export function getAdminStats(): AdminStats {
  const employees = getAllEmployees();
  const totalEmployees = employees.length;
  let passedCount = 0;
  let failedCount = 0;
  let inProgressCount = 0;
  let notStartedCount = 0;
  let totalScoreSum = 0;
  let scoredEmployeesCount = 0;

  employees.forEach((emp) => {
    if (emp.status === 'PASSED') {
      passedCount++;
    } else if (emp.status === 'FAILED') {
      failedCount++;
    } else if (emp.status === 'IN_PROGRESS') {
      inProgressCount++;
    } else {
      notStartedCount++;
    }

    if (emp.attempts.length > 0) {
      totalScoreSum += emp.bestScorePercentage;
      scoredEmployeesCount++;
    }
  });

  const completedCount = passedCount;
  const averageScore = scoredEmployeesCount > 0 ? Math.round(totalScoreSum / scoredEmployeesCount) : 0;
  const passRate = totalEmployees > 0 ? Math.round((passedCount / totalEmployees) * 100) : 0;

  return {
    totalEmployees,
    completedCount,
    passedCount,
    failedCount,
    inProgressCount,
    notStartedCount,
    averageScore,
    passRate
  };
}

export function exportResultsCSV(): void {
  const employees = getAllEmployees();
  if (employees.length === 0) {
    alert('No employee records available to export.');
    return;
  }

  const headers = [
    'Employee ID',
    'Employee Name',
    'Company Email',
    'Department',
    'Compliance Status',
    'Certification',
    'Attempts Count',
    'Latest Score (%)',
    'Best Score (%)',
    'Last Active Date',
    'Completion Date'
  ];

  const rows = employees.map((emp) => [
    `"${emp.employeeId || ''}"`,
    `"${emp.name || ''}"`,
    `"${emp.email || ''}"`,
    `"${emp.department || ''}"`,
    `"${emp.status || 'NOT_STARTED'}"`,
    `"${emp.status === 'PASSED' ? 'CERTIFIED' : 'NOT_CERTIFIED'}"`,
    `"${emp.attempts ? emp.attempts.length : 0}"`,
    `"${emp.latestScorePercentage || 0}"`,
    `"${emp.bestScorePercentage || 0}"`,
    `"${emp.lastActiveDate || ''}"`,
    `"${emp.completionDate || ''}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `LogicHive_Compliance_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportResultsJSON(): void {
  const employees = getAllEmployees();
  const dataStr = JSON.stringify(employees, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `LogicHive_Compliance_Data_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function importResultsJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      localStorage.setItem(ALL_EMPLOYEES_KEY, JSON.stringify(parsed));
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to import JSON data:', err);
    return false;
  }
}

export function resetAllData(): void {
  localStorage.removeItem(ALL_EMPLOYEES_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.setItem(ALL_EMPLOYEES_KEY, JSON.stringify([]));
}

export function clearAllStorageData(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(ALL_EMPLOYEES_KEY);
}
