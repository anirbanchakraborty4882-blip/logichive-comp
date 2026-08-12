import { TrainingModule } from '../types';

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 1,
    title: 'Task 1 — Information Security: Our Foundation',
    subtitle: 'Protecting Information Assets, CIA Triad & Incident Reporting',
    category: 'Information Security',
    iconName: 'ShieldCheck',
    content: {
      overview: 'At LogicHive, we handle sensitive customer data, proprietary technology, and confidential business information every day. Protecting this information is how we earn and keep our customers\' trust. Compliance and security are everyone\'s responsibility.',
      keyPoints: [
        'Protect Information Assets: Information and information assets are protected against unauthorized access, loss, or misuse across all systems.',
        'Maintain CIA Triad: Confidentiality, Integrity, and Availability of client and company data are strictly maintained.',
        'Identify & Treat Risks: Security risks are identified, assessed, and treated in a timely manner.',
        'Security in Development: Security is integrated into product engineering, AI, IoT, and cloud development lifecycles.',
        'Report All Incidents: All security incidents, actual or suspected, must be reported and investigated immediately.',
        'Awareness & Training: Information security awareness and training are mandatory for employees and relevant third parties.'
      ],
      policiesOrTargets: [
        { label: 'Primary Objective', value: 'Earn & Keep Customer Trust', description: 'Protect customer data, proprietary tech, and business secrets' },
        { label: 'Security Standard', value: 'ISO/IEC 27001', description: 'LogicHive operates under international security standards' },
        { label: 'Incident SLA', value: 'Immediate Reporting', description: 'Report any actual or suspected security event without delay' }
      ],
      doAndDonts: {
        correct: [
          'Protect proprietary code and customer data from unauthorized access or loss.',
          'Report any suspicious activity, phishing emails, or lost laptops immediately.',
          'Integrate security checks into engineering, AI, IoT, and cloud developments.'
        ],
        incorrect: [
          'Sharing system login credentials or leaving access badges unattended.',
          'Ignoring suspicious system activity or delaying incident reports.',
          'Storing customer data or source code on personal unsecured devices.'
        ]
      }
    },
    learningCheck: {
      id: 'mcq_m1',
      moduleId: 1,
      question: 'According to the Information Security foundation from the LogicHive training module, what does the "Integrity" pillar of the CIA Triad guarantee?',
      options: [
        'A. Systems and services are accessible 24/7 without interruption',
        'B. Client and company data is accurate, complete, and protected against unauthorized modification',
        'C. Information is restricted exclusively to executive board members',
        'D. Historical project files are archived in offsite storage facilities'
      ],
      correctAnswer: 1,
      explanation: 'Integrity ensures that client and company data is accurate, authentic, and protected against unauthorized or accidental modification or corruption.'
    }
  },
  {
    id: 2,
    title: 'Task 2 — Information Security Objectives: What We\'re Measuring',
    subtitle: 'Measurable Security Targets & Compliance Benchmarks',
    category: 'Information Security',
    iconName: 'Target',
    content: {
      overview: 'LogicHive measures information security performance through strict, quantifiable targets. Following security practices, reporting incidents, and completing training directly protects LogicHive\'s reputation and operations.',
      keyPoints: [
        '≤ 5 Reportable Security Incidents: Annual target to prevent data breaches through proactive controls and employee awareness.',
        '85% Security Audit Findings Closed: Annual target to ensure compliance with security practices helps us fix gaps promptly.',
        '≥ 85% IS Training Completion: Mandatory annual completion target for every employee — protects you and LogicHive.',
        '90% Risk Assessments Completed: Completed across critical systems and projects. Teams must participate in all assessments.',
        '100% Third-Party NDA Compliance: Annual target. All vendors and partners must sign Non-Disclosure Agreements and meet our security standards.'
      ],
      policiesOrTargets: [
        { label: 'Reportable Security Incidents Target', value: '≤ 5 / Year', description: 'Prevent breaches through proactive controls & employee vigilance' },
        { label: 'Audit Findings Closure Target', value: '85%', description: 'Promptly close internal & external security audit findings' },
        { label: 'IS Training Completion Target', value: '≥ 85%', description: 'Mandatory completion target for all employees' },
        { label: 'Risk Assessments Completion Target', value: '90%', description: 'Completed for critical systems and engineering projects' },
        { label: 'Third-Party NDA Compliance Target', value: '100%', description: 'All vendors and partners must sign NDAs' }
      ],
      checklist: [
        'Complete mandatory annual information security training.',
        'Ensure all external vendors sign NDAs before sharing project specs.',
        'Participate actively in risk assessments for your department.',
        'Report any potential security incident immediately to stay under the ≤5 target.'
      ]
    },
    learningCheck: {
      id: 'mcq_m2',
      moduleId: 2,
      question: 'What is LogicHive\'s annual target limit for Reportable Security Incidents as outlined in the Security Objectives?',
      options: [
        'A. Less than or equal to 5 incidents (≤ 5)',
        'B. Exactly 10 incidents per quarter',
        'C. Up to 25 minor incidents per year',
        'D. Zero incidents across all systems forever'
      ],
      correctAnswer: 0,
      explanation: 'LogicHive\'s annual Information Security objective sets the target for reportable security incidents to ≤ 5, achieved through employee awareness and proactive controls.'
    }
  },
  {
    id: 3,
    title: 'Task 3 — Quality Management: Delivering Excellence',
    subtitle: 'Customer Requirements, Defined Processes & Continuous Improvement',
    category: 'Quality Management',
    iconName: 'Award',
    content: {
      overview: 'Quality is not just a department — it\'s a mindset. It means understanding what our customers need and delivering it right the first time, every time.',
      keyPoints: [
        'Customer Requirements: Clearly understood and consistently met across all deliverables.',
        'Defined Processes: Design and engineering services follow repeatable and scalable processes.',
        'Regulatory Compliance: All deliverables comply with statutory, regulatory, and contractual requirements.',
        'Continuous Improvement: Quality Management System (QMS) is driven through monitoring, feedback, and innovation.',
        'Empowered Employees: Trained and empowered to maintain high standards of engineering and service delivery.',
        'Proactive Risk Management: Risks and opportunities impacting quality are identified and addressed proactively.'
      ],
      policiesOrTargets: [
        { label: 'Quality Stance', value: 'Right First Time, Every Time', description: 'Delivering excellence through defined scalable processes' },
        { label: 'Quality Framework', value: 'ISO 9001 QMS', description: 'Monitored through feedback, audits, and continuous improvement' }
      ],
      doAndDonts: {
        correct: [
          'Take pride in your work and adhere strictly to defined engineering processes.',
          'Speak up immediately whenever you spot potential quality or compliance risks.',
          'Verify that deliverables meet statutory, regulatory, and customer requirements.'
        ],
        incorrect: [
          'Skipping documented processes to rush a delivery out the door.',
          'Ignoring customer requirements or making unapproved scope changes.',
          'Treating quality control as solely the responsibility of the QA department.'
        ]
      }
    },
    learningCheck: {
      id: 'mcq_m3',
      moduleId: 3,
      question: 'Why do LogicHive design and engineering services follow defined, repeatable processes under Quality Management?',
      options: [
        'A. To eliminate the need for employee training',
        'B. To ensure consistency, scalability, and delivering quality right the first time',
        'C. To increase administrative paperwork for management',
        'D. To replace client feedback mechanisms'
      ],
      correctAnswer: 1,
      explanation: 'Defined processes ensure that design and engineering services follow repeatable, scalable standards so that customer requirements are met correctly the first time, every time.'
    }
  },
  {
    id: 4,
    title: 'Task 4 — Quality Management Objectives: What We\'re Measuring',
    subtitle: 'Customer Satisfaction, On-Time Delivery & Audit Compliance Metrics',
    category: 'Quality Management',
    iconName: 'BarChart3',
    content: {
      overview: 'LogicHive measures Quality Management System performance across five key quantitative benchmarks. Meeting deadlines while maintaining quality requires discipline from every team member.',
      keyPoints: [
        '≥ 90% Customer Satisfaction: Your attention to detail and responsiveness directly impacts this score.',
        '≥ 85% Process Compliance: Proven processes ensure quality and consistency — following them is not optional.',
        '≥ 90% On-Time Project Delivery: Meeting deadlines while maintaining quality requires discipline.',
        '≥ 85% Internal Audit Findings Closed: When assigned to close an audit finding, treat it as a top priority.',
        '≥ 85% QMS Training Completion: Mandatory for all employees to understand their role in maintaining standards.'
      ],
      policiesOrTargets: [
        { label: 'Customer Satisfaction Target', value: '≥ 90%', description: 'Directly impacted by attention to detail and responsiveness' },
        { label: 'Process Compliance Target', value: '≥ 85%', description: 'Following proven processes is non-negotiable' },
        { label: 'On-Time Project Delivery Target', value: '≥ 90%', description: 'Meeting delivery deadlines with uncompromised quality' },
        { label: 'Internal Audit Findings Closed Target', value: '≥ 85%', description: 'Closing audit findings promptly and effectively' },
        { label: 'QMS Training Completion Target', value: '≥ 85%', description: 'Mandatory training for all staff' }
      ]
    },
    learningCheck: {
      id: 'mcq_m4',
      moduleId: 4,
      question: 'What is the target score for Customer Satisfaction under LogicHive\'s Quality Management Objectives?',
      options: [
        'A. At least 75% (≥ 75%)',
        'B. At least 80% (≥ 80%)',
        'C. At least 85% (≥ 85%)',
        'D. At least 90% (≥ 90%)'
      ],
      correctAnswer: 3,
      explanation: 'LogicHive\'s Quality Management Objectives mandate achieving a Customer Satisfaction rating of ≥ 90%.'
    }
  },
  {
    id: 5,
    title: 'Task 5 — Company Ethics & Business Conduct',
    subtitle: 'Core Values in Action & Ethical Decisions',
    category: 'Ethics & Conduct',
    iconName: 'Scale',
    content: {
      overview: 'Ethics define our culture. They guide how we treat colleagues, customers, and partners — and how we make decisions when no one is watching.',
      keyPoints: [
        'Integrity: Be honest. Admit mistakes and correct them promptly.',
        'Professionalism: Represent LogicHive with pride in every interaction.',
        'Respect: Value diversity and treat everyone with dignity.',
        'Confidentiality: Protect information shared in trust. Never gossip.',
        'Accountability: Take responsibility for your actions and decisions.',
        'Transparency: Communicate openly. Share what others need to succeed.',
        'Ethical Example 1 (Bugs): You discover a bug before release. Ethical = Report it immediately, even if it delays the project. Unethical = Hide the bug to meet deadline.',
        'Ethical Example 2 (Gifts): A vendor offers an expensive gift. Ethical = Politely decline and report to manager. Unethical = Accept gift and stay silent.',
        'Ethical Example 3 (Customer Info): Overhear confidential customer info. Ethical = Keep it to yourself. Unethical = Mention to friends or leak online.'
      ],
      doAndDonts: {
        correct: [
          'Report technical bugs immediately prior to release, prioritizing transparency.',
          'Politely decline expensive gifts or hospitality from vendors.',
          'Keep confidential customer information completely private.'
        ],
        incorrect: [
          'Hiding bugs to meet project deadlines hoping customers won\'t notice.',
          'Accepting gifts or bribes from vendors during business transactions.',
          'Discussing confidential customer projects with external friends or family.'
        ]
      }
    },
    learningCheck: {
      id: 'mcq_m5',
      moduleId: 5,
      question: 'You discover a software bug shortly before a client release deadline. According to LogicHive Ethics guidelines, what is the ethical course of action?',
      options: [
        'A. Hide the bug to meet the deadline, hoping the customer won\'t notice',
        'B. Report the bug immediately, even if it delays the project release',
        'C. Blame the QA testing team for not finding the issue sooner',
        'D. Alter the test log documentation so the build passes review'
      ],
      correctAnswer: 1,
      explanation: 'Ethical conduct requires reporting defects immediately to maintain integrity and customer trust, even if it delays a project release.'
    }
  },
  {
    id: 6,
    title: 'Task 6 — Conflict of Interest: Keeping Decisions Clear',
    subtitle: 'Recognizing, Disclosing & Preventing Conflicts of Interest',
    category: 'Ethics & Conduct',
    iconName: 'AlertTriangle',
    content: {
      overview: 'A conflict of interest occurs when your personal interests could influence — or appear to influence — your business decisions. Recognizing and disclosing conflicts protects both you and LogicHive.',
      keyPoints: [
        'Gifts & Hospitality: Accepting valuable gifts, meals, or entertainment from vendors or clients that could influence your judgment.',
        'Vendor Relationships: Having a financial interest in a company we do business with, or owning stock in a competitor.',
        'Moonlighting: Working for a competitor or client outside LogicHive without disclosure, or using company resources for personal projects.',
        'Family Relationships: Hiring or supervising family members without proper disclosure and recusal.',
        'Personal Financial Interests: Making business decisions that benefit you personally rather than LogicHive or our customers.',
        'Golden Rule: When in doubt, disclose immediately to your manager or HR. Transparency is always the right choice. It\'s better to ask than to guess.'
      ],
      policiesOrTargets: [
        { label: 'Conflict Rule', value: 'Disclose Immediately', description: 'When in doubt, notify manager or HR right away' },
        { label: 'Secondary Employment', value: 'Prior Approval Mandatory', description: 'Moonlighting requires explicit disclosure and clearance' }
      ]
    },
    learningCheck: {
      id: 'mcq_m6',
      moduleId: 6,
      question: 'What is the required action when you are unsure whether a personal relationship or outside activity represents a Conflict of Interest at LogicHive?',
      options: [
        'A. Keep it secret until someone asks you directly',
        'B. Disclose immediately to your manager or HR department',
        'C. Ask a colleague to keep quiet about it',
        'D. Ignore it if it involves less than $1,000'
      ],
      correctAnswer: 1,
      explanation: 'When in doubt regarding a potential conflict of interest, LogicHive policy mandates disclosing immediately to your manager or HR.'
    }
  },
  {
    id: 7,
    title: 'Task 7 — POSH: Creating a Respectful Workplace',
    subtitle: 'Zero-Tolerance Policy, Reporting Channels & Support',
    category: 'Workplace Policies',
    iconName: 'Users',
    content: {
      overview: 'Prevention of Sexual Harassment (POSH) is about creating a workplace where everyone feels safe, respected, and valued. LogicHive enforces a strict ZERO-TOLERANCE policy.',
      keyPoints: [
        'What Is Not Tolerated: Sexual harassment of any kind — period. Unwelcome comments, gestures, physical contact, or requests of a sexual nature. Harassment via email, chat, video calls, or any channel. Behavior creating a hostile environment.',
        'Respectful Behavior: Treating all colleagues with dignity and professionalism. Respecting personal boundaries and space. Using appropriate language. Speaking up when witnessing inappropriate behavior.',
        '01. Report Immediately: Contact HR or the Internal Committee (IC) if you experience or witness harassment.',
        '02. Confidential Investigation: All reports are treated with strict confidentiality and investigated thoroughly.',
        '03. No Retaliation — Ever: You will not face negative consequences for reporting in good faith.',
        '04. Support Available: Counseling and support resources are available to all employees.'
      ],
      policiesOrTargets: [
        { label: 'Policy Stance', value: 'Zero Tolerance', description: 'Harassment of any kind is strictly prohibited' },
        { label: 'Reporting Bodies', value: 'HR or Internal Committee (IC)', description: 'Confidential reporting channels' },
        { label: 'Retaliation Stance', value: 'No Retaliation — Ever', description: 'Full protection for reporting in good faith' }
      ]
    },
    learningCheck: {
      id: 'mcq_m7',
      moduleId: 7,
      question: 'Under LogicHive\'s POSH policy, what protection is strictly guaranteed to an employee who reports sexual harassment in good faith?',
      options: [
        'A. They will be transferred to a remote location automatically',
        'B. They are protected by a strict No-Retaliation policy and guaranteed confidential investigation',
        'C. Their report will be shared publicly across the internal portal',
        'D. They must pay for an independent external investigator'
      ],
      correctAnswer: 1,
      explanation: 'LogicHive strictly guarantees that employees reporting harassment in good faith will face NO retaliation ever, and their report will be investigated with total confidentiality by HR or the Internal Committee.'
    }
  },
  {
    id: 8,
    title: 'Task 8 — Clear Desk & Clear Screen: Securing Your Workspace',
    subtitle: 'Workstation Security, Physical Hygiene & Shortcuts',
    category: 'Workplace Policies',
    iconName: 'Monitor',
    content: {
      overview: 'A single unlocked computer or unattended document can expose customer data or company secrets. Protecting information starts with simple daily habits.',
      keyPoints: [
        'Clear Screen Practice: Lock your computer before leaving (`Win + L` on Windows / `Mac + Ctrl + Q`). Log out fully at the end of the day. Never leave laptops unlocked in meeting rooms.',
        'Clear Desk Practice: Store confidential documents in locked drawers or cabinets overnight. Use approved shredders for sensitive papers — never throw confidential papers in general trash. Keep USB drives secured.',
        '≥ 95% Employee Compliance: Target for quarterly workplace inspections.',
        '100% Training Completion: Mandatory annual training for every employee.',
        'Daily Checklist: Lock screen before leaving desk | Secure all documents and lock drawers before leaving office | Use approved shredders only for document disposal.'
      ],
      policiesOrTargets: [
        { label: 'Clear Screen Shortcut (Win)', value: 'Win + L', description: 'Lock screen immediately before stepping away' },
        { label: 'Clear Screen Shortcut (Mac)', value: 'Cmd + Ctrl + Q', description: 'Mac workstation lock keyboard shortcut' },
        { label: 'Workplace Inspection Target', value: '≥ 95%', description: 'Quarterly inspection compliance target' },
        { label: 'Training Completion Target', value: '100%', description: 'Annual mandatory employee training' }
      ],
      doAndDonts: {
        correct: [
          'Lock your computer screen immediately whenever stepping away (Win + L / Cmd + Ctrl + Q).',
          'Store customer contracts and project plans in locked drawers overnight.',
          'Shred physical papers containing confidential data in approved shredder bins.'
        ],
        incorrect: [
          'Leaving laptop unlocked while grabbing coffee or attending a quick meeting.',
          'Leaving confidential documents on your desk overnight.',
          'Throwing confidential papers or USB drives in standard trash bins.'
        ]
      }
    },
    learningCheck: {
      id: 'mcq_m8',
      moduleId: 8,
      question: 'What is the required keyboard shortcut to lock your workstation screen on a Windows computer before stepping away from your desk?',
      options: [
        'A. Ctrl + Alt + Delete',
        'B. Windows Key + L (Win + L)',
        'C. Alt + Tab',
        'D. Ctrl + Shift + Esc'
      ],
      correctAnswer: 1,
      explanation: 'Under Clear Screen policy, Windows users must press `Win + L` (or Mac `Cmd + Ctrl + Q`) to lock their computer screen immediately before stepping away.'
    }
  },
  {
    id: 9,
    title: 'Task 9 — Your Responsibilities as a LogicHive Employee',
    subtitle: 'The 6 Mandates for Everyday Compliance',
    category: 'Responsibilities',
    iconName: 'CheckSquare',
    content: {
      overview: 'Compliance, security, quality, and ethics are not someone else\'s job — they\'re everyone\'s responsibility. Every employee plays a vital role in upholding our standards.',
      keyPoints: [
        '1. Follow Policies: Understand and adhere to all company policies. Ask your manager or HR if unclear.',
        '2. Protect Information: Lock your screen, secure documents, and report suspicious activity immediately.',
        '3. Professional Conduct: Act with integrity in all interactions. Treat colleagues and customers with respect.',
        '4. Report Unethical Conduct: Speak up about violations or incidents. You are protected under our no-retaliation policy.',
        '5. Support Quality: Follow defined processes and contribute to continuous improvement every day.',
        '6. Complete Training: Finish all mandatory compliance, security, and quality awareness training on time.'
      ],
      checklist: [
        'Do I understand and follow company SOPs?',
        'Do I lock my screen and secure physical files?',
        'Do I treat colleagues and customers with respect?',
        'Do I report potential security or ethical issues promptly?',
        'Have I completed all required annual training?'
      ]
    },
    learningCheck: {
      id: 'mcq_m9',
      moduleId: 9,
      question: 'Who is responsible for protecting information, supporting quality, and reporting unethical conduct at LogicHive?',
      options: [
        'A. Only the IT and HR departments',
        'B. Only senior management and team leads',
        'C. External security auditors',
        'D. Every employee in their daily work'
      ],
      correctAnswer: 3,
      explanation: 'Compliance, security, quality, and ethics are everyone\'s responsibility — every LogicHive employee is accountable in their daily work.'
    }
  },
  {
    id: 10,
    title: 'Task 10 — Key Takeaways: Building Our Culture Together',
    subtitle: 'Summary of Principles & Final Assessment Readiness',
    category: 'Responsibilities',
    iconName: 'Sparkles',
    content: {
      overview: 'Together, we build a secure, ethical, and quality-driven organization. Review these core principles before taking your Final Assessment Exam.',
      keyPoints: [
        'Security Starts With You: Every action you take protects our customers and our company.',
        'Quality is Shared: Excellence is built into every task, no matter how small.',
        'Ethics Define Us: Do the right thing, even when it\'s difficult.',
        'Respect Creates Better Work: Treat everyone with dignity and professionalism.',
        'Compliance Builds Trust: Customers choose us because we protect their information and deliver quality.',
        'You Matter: Your choices matter. Your actions matter. Every employee contributes to LogicHive\'s success.',
        'Final Assessment Requirement: You are now ready to take the 25-question Final Assessment. A score strictly GREATER than 90% (91%+) is required to pass and earn your certificate.'
      ],
      policiesOrTargets: [
        { label: 'Final Assessment Exam', value: '25 Multiple Choice Questions', description: 'Covers Information Security, Quality, Ethics, POSH, & Workspace Security' },
        { label: 'Passing Score Threshold', value: '> 90% Score Required', description: 'Must score strictly higher than 90% (e.g. 91% - 100%) to pass' }
      ]
    },
    learningCheck: {
      id: 'mcq_m10',
      moduleId: 10,
      question: 'What score requirement must be met on the 25-question Final Assessment to pass and receive LogicHive Compliance Certification?',
      options: [
        'A. 70% or higher',
        'B. 80% or higher',
        'C. Exactly 90%',
        'D. Strictly GREATER than 90% (91% or higher)'
      ],
      correctAnswer: 3,
      explanation: 'LogicHive certification policy mandates that employees must achieve a score strictly GREATER than 90% (e.g. 23/25 = 92% or higher) to pass.'
    }
  }
];
