import { recordAssessmentAttempt, getAllEmployees, resetAllData, clearAllStorageData } from '../../src/utils/storage';

describe('scoring and recordAssessmentAttempt', () => {
  beforeEach(() => {
    // clear storage
    clearAllStorageData();
    resetAllData();
  });

  test('recordAssessmentAttempt should mark pass for >= 90', () => {
    const emp = recordAssessmentAttempt('test1', {
      id: 'a1',
      timestamp: new Date().toISOString(),
      scorePercentage: 90,
      correctAnswersCount: 23,
      totalQuestions: 25,
      passed: true,
      answers: {}
    });

    expect(emp.latestScorePercentage).toBe(90);
    expect(emp.bestScorePercentage).toBe(90);
    expect(emp.status).toBe('PASSED');
  });

  test('recordAssessmentAttempt should mark fail for 88', () => {
    const emp = recordAssessmentAttempt('test2', {
      id: 'a2',
      timestamp: new Date().toISOString(),
      scorePercentage: 88,
      correctAnswersCount: 22,
      totalQuestions: 25,
      passed: false,
      answers: {}
    });

    expect(emp.latestScorePercentage).toBe(88);
    expect(emp.bestScorePercentage).toBe(88);
    expect(emp.status).toBe('FAILED');
  });

  test('bestScore should preserve highest score across attempts', () => {
    recordAssessmentAttempt('test3', {
      id: 'a3',
      timestamp: new Date().toISOString(),
      scorePercentage: 96,
      correctAnswersCount: 24,
      totalQuestions: 25,
      passed: true,
      answers: {}
    });

    const emp2 = recordAssessmentAttempt('test3', {
      id: 'a4',
      timestamp: new Date().toISOString(),
      scorePercentage: 92,
      correctAnswersCount: 23,
      totalQuestions: 25,
      passed: true,
      answers: {}
    });

    expect(emp2.bestScorePercentage).toBe(96);
    expect(emp2.latestScorePercentage).toBe(92);
    expect(emp2.status).toBe('PASSED');
  });
});
