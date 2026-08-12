import { Question } from '../types';

export const FINAL_ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'Information Security',
    question: 'Which element of the CIA Triad ensures that sensitive customer records are viewed only by authorized employees with a legitimate business need?',
    options: [
      'A. Availability',
      'B. Confidentiality',
      'C. Integrity',
      'D. Accountability'
    ],
    correctAnswer: 1,
    explanation: 'Confidentiality ensures that sensitive data is accessible solely to authorized individuals and protected against unauthorized disclosure.'
  },
  {
    id: 'q2',
    category: 'Information Security',
    question: 'What is LogicHive\'s mandatory SLA target window for reporting a detected or suspected security incident?',
    options: [
      'A. Within 2 hours of detection',
      'B. Within 24 hours of detection',
      'C. At the end of the current working shift',
      'D. During the quarterly security review'
    ],
    correctAnswer: 0,
    explanation: 'LogicHive security policy strictly requires 100% of security incidents to be reported within 2 hours of detection.'
  },
  {
    id: 'q3',
    category: 'Information Security Objectives',
    question: 'What is LogicHive\'s system availability SLA target for core production applications?',
    options: [
      'A. 95.0% uptime',
      'B. 98.5% uptime',
      'C. 99.9% uptime',
      'D. 100.0% zero downtime guaranteed'
    ],
    correctAnswer: 2,
    explanation: 'LogicHive\'s information security objective targets 99.9% production availability and service uptime.'
  },
  {
    id: 'q4',
    category: 'Information Security Objectives',
    question: 'How quickly must critical high-severity software vulnerabilities be patched under LogicHive security objectives?',
    options: [
      'A. Within 24 hours of discovery',
      'B. Within 7 business days',
      'C. During the next major quarterly release',
      'D. Within 30 calendar days'
    ],
    correctAnswer: 0,
    explanation: 'High-severity critical vulnerabilities must be patched or mitigated within 24 hours under LogicHive SLA objectives.'
  },
  {
    id: 'q5',
    category: 'Quality Management',
    question: 'What continuous improvement framework does LogicHive utilize for quality management processes?',
    options: [
      'A. Agile Waterfall Hybrid Model',
      'B. Plan-Do-Check-Act (PDCA) Cycle',
      'C. Six Sigma DMAIC Only',
      'D. Reactive Customer Feedback Loop'
    ],
    correctAnswer: 1,
    explanation: 'LogicHive applies the Plan-Do-Check-Act (PDCA) methodology for continuous quality management and workflow optimization.'
  },
  {
    id: 'q6',
    category: 'Quality Management Objectives',
    question: 'What is LogicHive\'s target for production defect density per Thousand Lines of Code (KLOC)?',
    options: [
      'A. Less than 0.5 defects per KLOC',
      'B. Less than 2.0 defects per KLOC',
      'C. Less than 5.0 defects per KLOC',
      'D. Zero defects across all releases'
    ],
    correctAnswer: 0,
    explanation: 'LogicHive limits production defect density to less than 0.5 defects per KLOC.'
  },
  {
    id: 'q7',
    category: 'Quality Management Objectives',
    question: 'What is the required Customer Satisfaction (CSAT) target score under LogicHive Quality Objectives?',
    options: [
      'A. At least 85%',
      'B. At least 90%',
      'C. At least 95%',
      'D. At least 98%'
    ],
    correctAnswer: 3,
    explanation: 'LogicHive Quality Objectives mandate maintaining a Customer Satisfaction (CSAT) rating of 98% or higher.'
  },
  {
    id: 'q8',
    category: 'Company Ethics',
    question: 'An engineer discovers a flaw in a deployed product feature that could cause minor data discrepancies. What is the ethical course of action?',
    options: [
      'A. Ignore it if the customer has not complained yet',
      'B. Immediately report the flaw, log an issue, and work with the team on a fix',
      'C. Quietly patch the code directly in production without logging a ticket',
      'D. Wait until the next annual system redesign'
    ],
    correctAnswer: 1,
    explanation: 'Ethical conduct requires honesty, transparency, logging technical defects, and following established change management procedures.'
  },
  {
    id: 'q9',
    category: 'Company Ethics',
    question: 'Which of the following represents UNETHICAL business behavior at LogicHive?',
    options: [
      'A. Admitting a mistake in a project status meeting',
      'B. Sharing proprietary client code with a friend working at another tech company',
      'C. Refusing a vendor gift card and reporting it to compliance',
      'D. Requesting an extension on a deadline due to unexpected QA defects'
    ],
    correctAnswer: 1,
    explanation: 'Sharing proprietary client source code or trade secrets outside LogicHive is a severe breach of confidentiality and ethics.'
  },
  {
    id: 'q10',
    category: 'Conflict of Interest',
    question: 'Which situation represents a direct Conflict of Interest that must be formally disclosed to HR?',
    options: [
      'A. Attending a free public technical webinar hosted by an industry group',
      'B. Evaluating software from a vendor firm where your spouse is a senior executive',
      'C. Referring a qualified former colleague for an open position through official recruitment channels',
      'D. Submitting an expense claim for an approved client lunch'
    ],
    correctAnswer: 1,
    explanation: 'Evaluating or awarding contracts to a vendor owned or managed by an immediate family member creates a clear Conflict of Interest.'
  },
  {
    id: 'q11',
    category: 'Conflict of Interest',
    question: 'An employee wishes to take on weekend freelance software development for an external client. What does LogicHive policy require?',
    options: [
      'A. No approval is needed as long as work is done on personal computers during weekends',
      'B. Explicit written prior approval from HR and Management before accepting any outside employment',
      'C. Verbal notification to a teammate on Monday morning',
      'D. Sharing 10% of freelance revenue with LogicHive'
    ],
    correctAnswer: 1,
    explanation: 'Moonlighting or secondary employment strictly requires prior written approval from HR and Management to ensure no conflict of interest or IP infringement.'
  },
  {
    id: 'q12',
    category: 'Conflict of Interest',
    question: 'What is LogicHive\'s rule regarding accepting cash or cash equivalent gifts (like gift cards) from vendors?',
    options: [
      'A. Allowed up to $500 per year',
      'B. Allowed during major festive seasons only',
      'C. Strictly prohibited regardless of the amount',
      'D. Allowed if approved by a direct peer'
    ],
    correctAnswer: 2,
    explanation: 'Accepting cash or cash equivalents (gift cards) from vendors or clients is strictly prohibited under LogicHive Conflict of Interest policy.'
  },
  {
    id: 'q13',
    category: 'POSH',
    question: 'Where does LogicHive\'s Prevention of Sexual Harassment (POSH) policy apply?',
    options: [
      'A. Only within physical company office premises during official hours',
      'B. Across physical offices, virtual meetings, Slack/Teams messaging, business trips, and work events',
      'C. Only in customer-facing environments',
      'D. Exclusively in executive boardroom meetings'
    ],
    correctAnswer: 1,
    explanation: 'The POSH policy applies to all physical office spaces, remote work environments, electronic communications, business travel, and company-sponsored events.'
  },
  {
    id: 'q14',
    category: 'POSH',
    question: 'To which internal body can an employee submit a confidential POSH complaint?',
    options: [
      'A. The External Security Audit Agency',
      'B. HR or the designated Internal Committee (IC)',
      'C. The IT Helpdesk Ticketing System',
      'D. The Public Relations Department'
    ],
    correctAnswer: 1,
    explanation: 'POSH complaints are handled confidentially by HR or the specially constituted Internal Committee (IC).'
  },
  {
    id: 'q15',
    category: 'POSH',
    question: 'An employee reports harassment in good faith. What protection does LogicHive guarantee?',
    options: [
      'A. Immediate reassignment of the complainant to a different department',
      'B. Strict No-Retaliation policy protecting the complainant from any victimization or adverse action',
      'C. Mandatory public disclosure of all hearing transcripts',
      'D. An automatic promotion upon investigation closure'
    ],
    correctAnswer: 1,
    explanation: 'LogicHive strictly guarantees protection under a No-Retaliation policy for anyone filing a good-faith report or participating in an investigation.'
  },
  {
    id: 'q16',
    category: 'Clear Desk & Clear Screen',
    question: 'What is the correct action when leaving your workstation to grab coffee or attend a brief meeting?',
    options: [
      'A. Leave the workstation unlocked if returning within 10 minutes',
      'B. Lock your computer screen immediately (`Win + L` / `Cmd + Ctrl + Q`)',
      'C. Dim the monitor brightness to minimum',
      'D. Place a notebook over the keyboard'
    ],
    correctAnswer: 1,
    explanation: 'Clear Screen policy requires locking your screen (`Win + L` or `Cmd + Ctrl + Q`) every time you step away from your workstation.'
  },
  {
    id: 'q17',
    category: 'Clear Desk & Clear Screen',
    question: 'Where should printed documents containing confidential client data be stored when leaving the office for the day?',
    options: [
      'A. Stacked neatly on top of your desk',
      'B. Locked inside your desk drawers or designated secure cabinets',
      'C. Placed in the open recycling bin next to the printer',
      'D. Taped to the whiteboard for team reference'
    ],
    correctAnswer: 1,
    explanation: 'Clear Desk policy mandates locking all confidential documents in drawers or cabinets before leaving for the day.'
  },
  {
    id: 'q18',
    category: 'Clear Desk & Clear Screen',
    question: 'An employee writes their system password on a sticky note attached under their keyboard. Is this acceptable?',
    options: [
      'A. Yes, because it is hidden under the keyboard',
      'B. Yes, if the employee changes their password monthly',
      'C. No, writing down passwords anywhere around workstations is a severe security violation',
      'D. Yes, as long as it is written in abbreviated code'
    ],
    correctAnswer: 2,
    explanation: 'Writing passwords on sticky notes, desks, or paper anywhere around workstations is strictly prohibited.'
  },
  {
    id: 'q19',
    category: 'Employee Responsibilities',
    question: 'Which of the following is ONE of the 6 Core Employee Responsibilities at LogicHive?',
    options: [
      'A. Approving corporate marketing budgets',
      'B. Promptly reporting unethical conduct, security breaches, or compliance violations',
      'C. Negotiating vendor discounts independently',
      'D. Managing server hardware procurement'
    ],
    correctAnswer: 1,
    explanation: 'Reporting unethical conduct and security breaches promptly is one of the 6 core employee compliance mandates.'
  },
  {
    id: 'q20',
    category: 'Employee Responsibilities',
    question: 'What is the employee requirement regarding mandatory compliance training modules?',
    options: [
      'A. Optional for senior developers with over 5 years of experience',
      'B. Mandatory completion for 100% of employees within the required timeframe',
      'C. Completed only if requested during an audit',
      'D. Required only for sales and customer success teams'
    ],
    correctAnswer: 1,
    explanation: 'Mandatory annual compliance training is required for 100% of LogicHive staff without exception.'
  },
  {
    id: 'q21',
    category: 'Assessment & Certification',
    question: 'What exact score percentage is required to pass the LogicHive Compliance Final Assessment?',
    options: [
      'A. Equal to or greater than 70%',
      'B. Equal to or greater than 80%',
      'C. Equal to or greater than 90%',
      'D. Strictly GREATER than 90% (e.g. 91% or higher)'
    ],
    correctAnswer: 3,
    explanation: 'LogicHive certification policy strictly requires a score greater than 90% (e.g. 91% - 100%). Scoring 90% or below is marked as FAIL.'
  },
  {
    id: 'q22',
    category: 'Assessment & Certification',
    question: 'If an employee receives a score of 88% (22 out of 25 correct) on their final assessment, what happens next?',
    options: [
      'A. They pass with a conditional certificate',
      'B. They fail the assessment and must review training content and retake the exam until achieving > 90%',
      'C. Their profile is locked permanently',
      'D. They must wait 6 months before trying again'
    ],
    correctAnswer: 1,
    explanation: 'A score of 88% is 90% or lower, resulting in a FAIL. The employee must review the material and retake the assessment.'
  },
  {
    id: 'q23',
    category: 'Information Security',
    question: 'In DevSecOps at LogicHive, when should security testing and vulnerability scanning take place?',
    options: [
      'A. Only after software has been running in production for 6 months',
      'B. Integrated throughout the entire development lifecycle and automated CI/CD pipeline',
      'C. Exclusively during annual external audits',
      'D. Manually right before customer demos'
    ],
    correctAnswer: 1,
    explanation: 'DevSecOps integrates automated security scanning, SAST/DAST, and code reviews directly into the CI/CD pipeline early in development.'
  },
  {
    id: 'q24',
    category: 'Quality Management',
    question: 'What is the required peer code review rate before code can be merged into production branches?',
    options: [
      'A. 50% of critical commits',
      'B. 75% of bug fix branches',
      'C. 100% mandatory peer review for all merges',
      'D. Code reviews are optional for staff engineers'
    ],
    correctAnswer: 2,
    explanation: 'LogicHive Quality Standards require 100% peer review compliance prior to merging code into release branches.'
  },
  {
    id: 'q25',
    category: 'Clear Desk & Clear Screen',
    question: 'How should sensitive physical documents containing customer PII be disposed of when no longer needed?',
    options: [
      'A. Discarded in the desk recycling box',
      'B. Torn by hand into two pieces and thrown in trash',
      'C. Deposited into designated secure locked shredder bins',
      'D. Left on the printer table for facility staff'
    ],
    correctAnswer: 2,
    explanation: 'Confidential documents containing PII or proprietary data must be shredded in designated secure locked shredder bins.'
  }
];
