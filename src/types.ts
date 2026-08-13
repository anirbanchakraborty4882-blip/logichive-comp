export type ComplianceStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'PASSED' | 'FAILED';

export interface MCQOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  moduleId?: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed index
  explanation: string;
  category?: string;
}

export interface TrainingModule {
  id: number;
  title: string;
  subtitle: string;
  category: 'Information Security' | 'Quality Management' | 'Ethics & Conduct' | 'Workplace Policies' | 'Responsibilities';
  iconName: string;
  content: {
    overview: string;
    keyPoints: string[];
    policiesOrTargets?: { label: string; value: string; description?: string }[];
    doAndDonts?: { correct: string[]; incorrect: string[] };
    checklist?: string[];
  };
  learningCheck: Question;
}

export interface AssessmentAttempt {
  id: string;
  timestamp: string;
  scorePercentage: number;
  correctAnswersCount: number;
  totalQuestions: number;
  passed: boolean; // true if scorePercentage >= 90
  answers: Record<string, number>; // questionId -> selectedIndex
}

export interface EmployeeProfile {
  employeeId: string;
  name: string;
  email: string; // Corporate email address
  department: string;
  currentModuleIndex: number;
  moduleLearningChecksPassed: Record<number, boolean>;
  attempts: AssessmentAttempt[];
  status: ComplianceStatus;
  bestScorePercentage: number;
  latestScorePercentage: number;
  lastActiveDate?: string;
  completionDate?: string;
}

export interface AdminStats {
  totalEmployees: number;
  completedCount: number;
  passedCount: number;
  failedCount: number;
  inProgressCount: number;
  notStartedCount: number;
  averageScore: number;
  passRate: number;
}
