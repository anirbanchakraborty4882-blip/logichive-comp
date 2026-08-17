import { recordAssessmentAttempt, getAdminStats, importResultsJSON, clearAllStorageData, resetAllData } from '../../src/utils/storage';

describe('admin stats', () => {
  beforeEach(() => {
    clearAllStorageData();
    resetAllData();
  });

  test('getAdminStats reflects passed and failed counts', () => {
    recordAssessmentAttempt('empA', { id: 'a1', timestamp: new Date().toISOString(), scorePercentage: 92, correctAnswersCount: 23, totalQuestions: 25, passed: true, answers: {} });
    recordAssessmentAttempt('empB', { id: 'a2', timestamp: new Date().toISOString(), scorePercentage: 88, correctAnswersCount: 22, totalQuestions: 25, passed: false, answers: {} });

    const stats = getAdminStats();
    expect(stats.totalEmployees).toBeGreaterThanOrEqual(2);
    expect(stats.passedCount).toBeGreaterThanOrEqual(1);
    expect(stats.failedCount).toBeGreaterThanOrEqual(1);
  });

  test('imported employees affect admin stats', () => {
    const sample = [
      { employeeId: 'LH-2001', name: 'C1', email: 'c1@logichive.com', department: 'Ops', currentModuleIndex: 0, moduleLearningChecksPassed: {}, attempts: [], status: 'NOT_STARTED', bestScorePercentage: 0, latestScorePercentage: 0 }
    ];
    importResultsJSON(JSON.stringify(sample));
    const stats = getAdminStats();
    expect(stats.totalEmployees).toBeGreaterThanOrEqual(1);
  });
});
