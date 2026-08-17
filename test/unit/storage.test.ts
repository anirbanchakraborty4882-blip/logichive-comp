import { importResultsJSON, getAllEmployees, resetAllData, clearAllStorageData, runStartupDataMigration } from '../../src/utils/storage';

describe('storage utilities', () => {
  beforeEach(() => {
    clearAllStorageData();
    resetAllData();
  });

  test('importResultsJSON should store employees and getAllEmployees should return them', () => {
    const sample = [
      { employeeId: 'LH-1001', name: 'Alice', email: 'alice@logichive.com', department: 'Eng', currentModuleIndex: 0, moduleLearningChecksPassed: {}, attempts: [], status: 'NOT_STARTED', bestScorePercentage: 0, latestScorePercentage: 0 }
    ];

    const ok = importResultsJSON(JSON.stringify(sample));
    expect(ok).toBe(true);
    const all = getAllEmployees();
    expect(all.length).toBe(1);
    expect(all[0].email).toBe('alice@logichive.com');
  });

  test('getAllEmployees should handle corrupt JSON gracefully', () => {
    // simulate corrupt localStorage
    localStorage.setItem('logichive_all_employees_data', 'INVALID_JSON');
    const all = getAllEmployees();
    // should return INITIAL_EMPLOYEES (empty array) or at least not throw
    expect(Array.isArray(all)).toBe(true);
  });

  test('runStartupDataMigration should remove aarav entries', () => {
    const sample = [
      { employeeId: 'LH001', name: 'Aarav Sharma', email: 'aarav@logichive.internal', department: 'Eng', currentModuleIndex: 0, moduleLearningChecksPassed: {}, attempts: [], status: 'NOT_STARTED', bestScorePercentage: 0, latestScorePercentage: 0 },
      { employeeId: 'LH1002', name: 'Bob', email: 'bob@logichive.com', department: 'HR', currentModuleIndex: 0, moduleLearningChecksPassed: {}, attempts: [], status: 'NOT_STARTED', bestScorePercentage: 0, latestScorePercentage: 0 }
    ];

    localStorage.setItem('logichive_all_employees_data', JSON.stringify(sample));
    runStartupDataMigration();
    const cleaned = getAllEmployees();
    expect(cleaned.find(e => e.name.includes('Aarav'))).toBeUndefined();
    expect(cleaned.find(e => e.name === 'Bob')).toBeTruthy();
  });
});
