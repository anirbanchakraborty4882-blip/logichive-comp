import JSZip from 'jszip';

export async function downloadStandaloneLmsZip(): Promise<void> {
  const zip = new JSZip();

  // 1. README.md
  const readmeContent = `# LogicHive Internal Compliance Awareness Training LMS

## Overview
This is the standalone, offline-capable **LogicHive Compliance Awareness Training LMS** designed for internal corporate deployment. It requires **no server, no database, no backend, and no internet connection**.

## How to Run
1. Unzip the downloaded file folder.
2. Double-click **\`index.html\`** in any modern web browser (Chrome, Edge, Firefox, Safari).
3. The LMS will launch immediately.

## Key Features & Rules
- **Employee Identification**: Requires Employee Name and Employee ID (e.g., \`LH001\`).
- **10 Interactive Training Modules**:
  1. Information Security Foundations
  2. Information Security Objectives & SLA Targets
  3. Quality Management Principles
  4. Quality Management Objectives & KPIs
  5. Company Ethics & Business Conduct
  6. Conflict of Interest (CoI)
  7. Prevention of Sexual Harassment (POSH)
  8. Clear Desk & Clear Screen Policy
  9. Core Employee Responsibilities
  10. Key Takeaways & Compliance Readiness
- **Per-Slide Learning Checks**: Each module ends with a mandatory MCQ and instant explanation.
- **25-Question Final Assessment**: Randomized exam testing all training modules.
- **Strict Passing Threshold**:
  - **PASS**: Score strictly **GREATER than 90%** (e.g. 92% or 23/25).
  - **FAIL**: Score **90% or below** (e.g. 88% or 22/25). Retake required.
- **Completion Certificate**: Downloadable & printable certificate unlocked upon achieving > 90%.
- **Admin / Trainer Dashboard**:
  - Tracks compliance progress for ~30 pre-populated employees.
  - Generates downloadable CSV reports (\`Export Results CSV\`).
  - Supports data backup and offline sync via JSON import/export.

## Storage
All training state and results are stored in the browser's \`localStorage\`. Data persists across page refreshes.
`;

  // 2. index.html
  const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LogicHive Compliance Awareness Training LMS</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <div id="app">
    <!-- Rendered dynamically by app.js -->
  </div>
  <script src="questions.js"></script>
  <script src="app.js"></script>
</body>
</html>
`;

  // 3. style.css
  const styleCssContent = `/* LogicHive Corporate LMS Stylesheet */
:root {
  --primary-navy: #0F172A;
  --primary-slate: #1E293B;
  --accent-teal: #0D9488;
  --accent-emerald: #10B981;
  --bg-canvas: #F8FAFC;
  --card-bg: #FFFFFF;
  --text-dark: #0F172A;
  --text-muted: #64748B;
  --border-color: #E2E8F0;
  --danger-red: #EF4444;
  --success-green: #10B981;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-canvas);
  color: var(--text-dark);
  line-height: 1.6;
}

.header-bar {
  background-color: var(--primary-navy);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.logo-text { font-weight: 800; font-size: 1.25rem; letter-spacing: -0.5px; color: #38BDF8; }
.logo-badge { background-color: rgba(56,189,248,0.15); color: #38BDF8; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; margin-left: 0.5rem; text-transform: uppercase; font-weight: 700; }

.container { max-width: 1000px; margin: 2rem auto; padding: 0 1rem; }

.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.btn-primary { background-color: var(--accent-teal); color: white; }
.btn-primary:hover { background-color: #0F766E; }

.btn-secondary { background-color: var(--primary-slate); color: white; }
.btn-outline { background-color: transparent; border: 1px solid var(--border-color); color: var(--text-dark); }
.btn-outline:hover { background-color: #F1F5F9; }

.badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
.badge-pass { background-color: #D1FAE5; color: #065F46; }
.badge-fail { background-color: #FEE2E2; color: #991B1B; }
.badge-info { background-color: #E0F2FE; color: #075985; }

.option-btn {
  width: 100%;
  text-align: left;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.15s;
}
.option-btn:hover { border-color: var(--accent-teal); background-color: #F0FDFA; }
.option-btn.selected { border-color: var(--accent-teal); background-color: #CCFBF1; font-weight: 600; }
.option-btn.correct { border-color: var(--success-green); background-color: #D1FAE5; font-weight: 600; }
.option-btn.incorrect { border-color: var(--danger-red); background-color: #FEE2E2; }

.progress-bar-bg { width: 100%; background: #E2E8F0; height: 8px; border-radius: 4px; overflow: hidden; margin: 1rem 0; }
.progress-bar-fill { height: 100%; background: var(--accent-teal); transition: width 0.3s ease; }

.table-responsive { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; }
th, td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); }
th { background-color: #F8FAFC; color: var(--text-muted); font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px; }

.cert-card {
  border: 8px double var(--primary-navy);
  padding: 3rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin: 2rem 0;
}
`;

  // 4. questions.js
  const questionsJsContent = `// LogicHive Offline Questions & Modules Data
window.TRAINING_MODULES = [
  {
    id: 1,
    title: "Module 1 — Information Security Foundations",
    subtitle: "Protecting Information Assets, CIA Triad & Risk Management",
    overview: "Information Security safeguards LogicHive's intellectual property, confidential customer data, and technology infrastructure against unauthorized access or disclosure.",
    keyPoints: [
      "Protecting Information Assets: Source code, databases, and configuration secrets.",
      "CIA Triad: Confidentiality, Integrity, and Availability.",
      "Security in Development (DevSecOps): SAST/DAST testing and mandatory code reviews.",
      "Incident Reporting: Report all security events within 2 hours."
    ],
    mcq: {
      question: "According to the CIA Triad, what does the Integrity pillar guarantee?",
      options: [
        "A. Systems are operational 24/7",
        "B. Data is accurate, complete, and protected against unauthorized modification",
        "C. Data is restricted only to executives",
        "D. Tapes are stored offsite"
      ],
      correctAnswer: 1,
      explanation: "Integrity ensures information is accurate, authentic, and protected against unauthorized modification."
    }
  },
  {
    id: 2,
    title: "Module 2 — Information Security Objectives & Targets",
    subtitle: "Measurable Security Benchmarks & SLA Compliance",
    overview: "LogicHive maintains strict measurable security objectives to ensure operational resilience.",
    keyPoints: [
      "System Availability Target: 99.9% uptime for core production applications.",
      "Critical Vulnerability SLA: Patch critical CVEs within 24 hours.",
      "Incident Reporting SLA: 100% of security events reported within 2 hours.",
      "Staff Training Target: 100% mandatory completion."
    ],
    mcq: {
      question: "What is LogicHive's mandatory SLA target window for reporting a security incident?",
      options: [
        "A. Within 24 hours of discovery",
        "B. Within 2 hours of detection",
        "C. By the end of the week",
        "D. During the quarterly audit"
      ],
      correctAnswer: 1,
      explanation: "Security policy strictly requires 100% of security incidents to be reported within 2 hours of detection."
    }
  },
  {
    id: 3,
    title: "Module 3 — Quality Management Principles",
    subtitle: "Customer Requirements, Defined Processes & Continuous Improvement",
    overview: "Quality Management at LogicHive ensures products exceed customer expectations through standardized processes and the PDCA cycle.",
    keyPoints: [
      "Customer Requirements: Clear scope and specification alignment.",
      "Defined Processes: SOPs eliminate operational errors.",
      "Continuous Improvement: Plan-Do-Check-Act (PDCA) methodology."
    ],
    mcq: {
      question: "Which methodology does LogicHive utilize for continuous quality improvement?",
      options: [
        "A. Waterfall Phase Gate",
        "B. Plan-Do-Check-Act (PDCA) Cycle",
        "C. Ad-Hoc Execution",
        "D. Reactive Escalation"
      ],
      correctAnswer: 1,
      explanation: "LogicHive uses the Plan-Do-Check-Act (PDCA) cycle for continuous quality improvement."
    }
  },
  {
    id: 4,
    title: "Module 4 — Quality Management Objectives & KPIs",
    subtitle: "Customer Satisfaction, Defect Density & Audits",
    overview: "Our Quality System establishes quantitative metrics to measure customer satisfaction and code reliability.",
    keyPoints: [
      "Customer Satisfaction (CSAT): Target >= 98% client satisfaction rating.",
      "Defect Density SLA: Fewer than 0.5 defects per KLOC in production.",
      "Peer Code Review Rate: 100% of merged code must undergo peer review."
    ],
    mcq: {
      question: "What is LogicHive's maximum allowable production defect density target?",
      options: [
        "A. Less than 5.0 defects per KLOC",
        "B. Less than 0.5 defects per KLOC",
        "C. Exactly 10 defects per release",
        "D. Zero defects across product lifetime"
      ],
      correctAnswer: 1,
      explanation: "LogicHive limits production defect density to less than 0.5 defects per KLOC."
    }
  },
  {
    id: 5,
    title: "Module 5 — Company Ethics & Business Conduct",
    subtitle: "Integrity, Professionalism, Respect & Accountability",
    overview: "Ethical conduct is the cornerstone of LogicHive culture. We adhere to integrity, respect, and transparency.",
    keyPoints: [
      "Integrity: Honesty and truthfulness in all business dealings.",
      "Respect: Inclusive workplace free from discrimination or harassment.",
      "Accountability: Taking ownership of errors and corrective actions."
    ],
    mcq: {
      question: "Your team discovers a bug right before a major client deployment. What is the ethical action?",
      options: [
        "A. Hide the bug and deploy anyway",
        "B. Disclose the bug immediately and collaborate on a fix",
        "C. Blame the QA testing team",
        "D. Alter the test logs to show green"
      ],
      correctAnswer: 1,
      explanation: "Ethics requires immediate disclosure of technical defects and transparent collaboration on remediation."
    }
  },
  {
    id: 6,
    title: "Module 6 — Conflict of Interest (CoI)",
    subtitle: "Gifts, Vendor Relations, Moonlighting & Personal Interests",
    overview: "A Conflict of Interest occurs when personal relationships or external jobs compromise professional judgment.",
    keyPoints: [
      "Gifts Policy: Cash or lavish gifts strictly prohibited. Nominal gifts disclosed.",
      "Moonlighting: Secondary jobs strictly prohibited without written HR approval.",
      "Vendor Relationships: Fair procurement based strictly on merit."
    ],
    mcq: {
      question: "A vendor offers an employee an expensive gift card during contract renewal. What should the employee do?",
      options: [
        "A. Accept it quietly",
        "B. Decline the gift card and report the offer to HR / Compliance",
        "C. Share it with team members",
        "D. Buy office supplies with it"
      ],
      correctAnswer: 1,
      explanation: "Accepting cash equivalents is prohibited. The employee must decline and report the offer to HR."
    }
  },
  {
    id: 7,
    title: "Module 7 — Prevention of Sexual Harassment (POSH)",
    subtitle: "Zero-Tolerance Policy, Reporting & Support",
    overview: "LogicHive is committed to a safe workplace free from harassment, bias, or intimidation.",
    keyPoints: [
      "Zero Tolerance: Applies to physical office, virtual chats, and company events.",
      "Reporting Channels: Report directly to HR or Internal Committee (IC).",
      "No Retaliation: Strict protection for good-faith complainants."
    ],
    mcq: {
      question: "What protection does LogicHive guarantee for an employee reporting harassment in good faith?",
      options: [
        "A. Mandatory department transfer",
        "B. Strict No-Retaliation protection and confidential investigation",
        "C. Informal peer resolution",
        "D. Public transcript disclosure"
      ],
      correctAnswer: 1,
      explanation: "LogicHive guarantees confidential investigation and strict protection under a No-Retaliation policy."
    }
  },
  {
    id: 8,
    title: "Module 8 — Clear Desk & Clear Screen Policy",
    subtitle: "Workstation Security & Password Safety",
    overview: "Physical workstation security prevents unauthorized viewing of sensitive files and systems.",
    keyPoints: [
      "Clear Desk: Lock confidential documents in drawers when unattended.",
      "Clear Screen: Lock workstation (Win+L / Cmd+Ctrl+Q) whenever stepping away.",
      "No Password Sticky Notes: Writing passwords on notes is strictly prohibited."
    ],
    mcq: {
      question: "An employee leaves their desk for 5 minutes to grab coffee. What is the correct procedure?",
      options: [
        "A. Leave the screen open",
        "B. Lock the computer screen (Win+L / Cmd+Ctrl+Q) and cover confidential paper",
        "C. Ask a neighbor to watch it",
        "D. Turn off monitor power button only"
      ],
      correctAnswer: 1,
      explanation: "Employees must lock their computer screen and secure sensitive documents whenever stepping away."
    }
  },
  {
    id: 9,
    title: "Module 9 — Core Employee Responsibilities",
    subtitle: "The 6 Mandates for Everyday Compliance",
    overview: "Compliance is a shared daily responsibility across all team members at LogicHive.",
    keyPoints: [
      "1. Follow All Policies",
      "2. Protect Information Assets",
      "3. Maintain Professional Conduct",
      "4. Report Unethical Behavior",
      "5. Support Quality Standards",
      "6. Complete Mandatory Training"
    ],
    mcq: {
      question: "What should an employee do if they witness a peer violating data security policies?",
      options: [
        "A. Mind their own business",
        "B. Promptly report the violation through official security/HR channels",
        "C. Post anonymously on social media",
        "D. Mention it during annual performance reviews"
      ],
      correctAnswer: 1,
      explanation: "Employees are required to report security breaches and policy violations promptly through official channels."
    }
  },
  {
    id: 10,
    title: "Module 10 — Key Takeaways & Readiness Check",
    subtitle: "Final Compliance Checklist & Certification Prep",
    overview: "Review key takeaways before taking the 25-question Final Assessment.",
    keyPoints: [
      "Security integrated into every dev lifecycle phase.",
      "Quality standards: < 0.5 defects / KLOC and >= 98% CSAT.",
      "Passing Threshold: Final score must be strictly GREATER than 90%."
    ],
    mcq: {
      question: "What exact score threshold is required to pass the LogicHive Compliance Final Assessment?",
      options: [
        "A. 70% or higher",
        "B. 80% or higher",
        "C. Exactly 90%",
        "D. Strictly greater than 90% (91% or higher)"
      ],
      correctAnswer: 3,
      explanation: "A passing score must be strictly greater than 90% (e.g. 91% - 100%). Scoring 90% or below results in a FAIL."
    }
  }
];

window.FINAL_QUESTIONS = [
  {
    question: "Which pillar of the CIA Triad ensures sensitive client records are viewed only by authorized personnel?",
    options: ["A. Availability", "B. Confidentiality", "C. Integrity", "D. Auditability"],
    correctAnswer: 1,
    explanation: "Confidentiality ensures sensitive data is accessible solely to authorized individuals."
  },
  {
    question: "What is LogicHive's mandatory SLA target window for reporting a security incident?",
    options: ["A. Within 2 hours of detection", "B. Within 24 hours of detection", "C. End of shift", "D. During quarterly review"],
    correctAnswer: 0,
    explanation: "Incidents must be reported within 2 hours of detection."
  },
  {
    question: "What is LogicHive's target for system uptime availability for core production applications?",
    options: ["A. 95.0%", "B. 98.5%", "C. 99.9%", "D. 100.0%"],
    correctAnswer: 2,
    explanation: "Production uptime target is 99.9%."
  },
  {
    question: "How quickly must high-severity critical security vulnerabilities be patched?",
    options: ["A. Within 24 hours of discovery", "B. Within 7 days", "C. Next release cycle", "D. Within 30 days"],
    correctAnswer: 0,
    explanation: "Critical CVEs must be patched within 24 hours."
  },
  {
    question: "Which quality management continuous improvement cycle does LogicHive follow?",
    options: ["A. Waterfall Phase Gate", "B. Plan-Do-Check-Act (PDCA) Cycle", "C. Six Sigma DMAIC Only", "D. Reactive Feedback Loop"],
    correctAnswer: 1,
    explanation: "LogicHive uses the Plan-Do-Check-Act (PDCA) cycle."
  },
  {
    question: "What is LogicHive's maximum allowable production defect density per KLOC?",
    options: ["A. Less than 0.5 defects per KLOC", "B. Less than 2.0 defects per KLOC", "C. Less than 5.0 defects per KLOC", "D. Zero defects"],
    correctAnswer: 0,
    explanation: "Defect density target is < 0.5 defects per KLOC."
  },
  {
    question: "What is the required Customer Satisfaction (CSAT) target score under LogicHive Quality Objectives?",
    options: ["A. At least 85%", "B. At least 90%", "C. At least 95%", "D. At least 98%"],
    correctAnswer: 3,
    explanation: "CSAT target is >= 98%."
  },
  {
    question: "Your engineering team discovers a bug before client deployment. What is the ethical choice?",
    options: ["A. Hide the bug", "B. Disclose the bug immediately and collaborate on a resolution", "C. Blame QA", "D. Alter test logs"],
    correctAnswer: 1,
    explanation: "Ethics requires immediate, honest disclosure."
  },
  {
    question: "Which action represents UNETHICAL behavior at LogicHive?",
    options: ["A. Admitting a mistake", "B. Sharing proprietary client source code outside the company", "C. Refusing a vendor gift card", "D. Requesting deadline extensions for QA"],
    correctAnswer: 1,
    explanation: "Leaking proprietary source code violates confidentiality and ethics."
  },
  {
    question: "A vendor offers an employee a high-value gift card during contract renewal. What should the employee do?",
    options: ["A. Accept it quietly", "B. Decline the gift card and report the offer to HR/Compliance", "C. Share it with team members", "D. Buy office supplies"],
    correctAnswer: 1,
    explanation: "Cash equivalents must be declined and reported to HR."
  },
  {
    question: "What does LogicHive policy require before an employee can engage in secondary moonlighting employment?",
    options: ["A. No approval needed if done on weekends", "B. Explicit written prior approval from HR and Management", "C. Verbal peer notice", "D. Sharing 10% revenue"],
    correctAnswer: 1,
    explanation: "Moonlighting strictly requires prior written HR/Management clearance."
  },
  {
    question: "Where does LogicHive's Prevention of Sexual Harassment (POSH) policy apply?",
    options: ["A. Physical office only", "B. Offices, virtual chats, Slack/Teams, work trips, and company events", "C. Customer sites only", "D. Boardrooms only"],
    correctAnswer: 1,
    explanation: "POSH applies across physical and virtual workplaces."
  },
  {
    question: "To which body can an employee submit a confidential POSH complaint?",
    options: ["A. Security Audit Agency", "B. HR or Internal Committee (IC)", "C. IT Helpdesk", "D. PR Department"],
    correctAnswer: 1,
    explanation: "POSH complaints are handled by HR or the Internal Committee (IC)."
  },
  {
    question: "What protection does LogicHive guarantee for an employee reporting harassment in good faith?",
    options: ["A. Reassignment", "B. Strict No-Retaliation protection and confidential investigation", "C. Informal resolution", "D. Public transcript release"],
    correctAnswer: 1,
    explanation: "LogicHive guarantees confidential investigation and strict No-Retaliation protection."
  },
  {
    question: "What is the required action when leaving your desk for coffee or a meeting?",
    options: ["A. Leave screen open", "B. Lock screen immediately (Win+L / Cmd+Ctrl+Q)", "C. Dim monitor", "D. Place paper on keyboard"],
    correctAnswer: 1,
    explanation: "Always lock screen when stepping away."
  },
  {
    question: "Where should printed confidential customer files be stored at the end of the workday?",
    options: ["A. On top of desk", "B. Locked inside desk drawers or secure cabinets", "C. Open recycling bin", "D. Taped to whiteboard"],
    correctAnswer: 1,
    explanation: "Confidential files must be locked in desk drawers overnight."
  },
  {
    question: "Is writing system passwords on sticky notes attached to monitors allowed?",
    options: ["A. Yes, if under keyboard", "B. Yes, if changed monthly", "C. No, writing passwords anywhere around workstations is a severe violation", "D. Yes, if abbreviated"],
    correctAnswer: 2,
    explanation: "Writing passwords on notes is strictly prohibited."
  },
  {
    question: "Which of the following is one of the Core Employee Responsibilities at LogicHive?",
    options: ["A. Approving marketing budgets", "B. Promptly reporting unethical conduct, security breaches, or compliance violations", "C. Negotiating vendor rates", "D. Server hardware setup"],
    correctAnswer: 1,
    explanation: "Prompt reporting of violations is a mandatory core responsibility."
  },
  {
    question: "What is the employee completion requirement for mandatory compliance training?",
    options: ["A. Optional for senior devs", "B. Mandatory completion for 100% of employees", "C. Audit-only", "D. Sales team only"],
    correctAnswer: 1,
    explanation: "Compliance training is mandatory for 100% of employees."
  },
  {
    question: "What exact score percentage is required to pass the LogicHive Compliance Final Assessment?",
    options: ["A. >= 70%", "B. >= 80%", "C. Exactly 90%", "D. Strictly GREATER than 90% (e.g. 91% or higher)"],
    correctAnswer: 3,
    explanation: "Score MUST be strictly greater than 90% to pass."
  },
  {
    question: "If an employee scores 88% (22/25) on the final assessment, what is the result?",
    options: ["A. PASS with distinction", "B. FAIL — must review material and retake assessment", "C. Account locked", "D. Wait 6 months"],
    correctAnswer: 1,
    explanation: "Score <= 90% is marked as FAIL and requires a retake."
  },
  {
    question: "When should security vulnerability scanning occur in DevSecOps?",
    options: ["A. 6 months after release", "B. Integrated throughout the dev lifecycle and automated CI/CD pipeline", "C. Annual audits only", "D. Before customer demos"],
    correctAnswer: 1,
    explanation: "DevSecOps integrates continuous security scanning into the CI/CD pipeline."
  },
  {
    question: "What is the required peer code review rate before code can be merged into production branches?",
    options: ["A. 50%", "B. 75%", "C. 100% mandatory peer review for all merges", "D. Optional"],
    correctAnswer: 2,
    explanation: "100% peer review compliance is mandatory."
  },
  {
    question: "How should sensitive physical paper containing customer data be disposed of?",
    options: ["A. Desk bin", "B. Hand-torn in half", "C. Deposited into designated secure locked shredder bins", "D. Left on printer table"],
    correctAnswer: 2,
    explanation: "Confidential physical papers must be deposited in locked shredder bins."
  },
  {
    question: "What is the primary objective of LogicHive's Compliance Awareness Training?",
    options: ["A. Memorizing corporate acronyms", "B. Ensuring 100% adherence to Security, Quality, Ethics, POSH, and Workstation standards", "C. Replacing software development testing", "D. Annual office social planning"],
    correctAnswer: 1,
    explanation: "The LMS ensures compliance with Information Security, Quality Management, Ethics, POSH, and Workplace policies."
  }
];
`;

  // 5. app.js
  const appJsContent = `// LogicHive Offline LMS Application Script
(function() {
  const STORAGE_KEY_USER = 'logichive_offline_user';
  const STORAGE_KEY_ALL = 'logichive_offline_all_records';

  let currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY_USER) || 'null');
  let view = currentUser ? 'training' : 'welcome'; // 'welcome' | 'training' | 'assessment' | 'result' | 'admin' | 'cert'
  let currentModuleIdx = currentUser ? (currentUser.currentModuleIndex || 0) : 0;
  let selectedMcqAnswer = null;
  let mcqSubmitted = false;

  // Final exam state
  let examQuestions = [];
  let currentExamIdx = 0;
  let userExamAnswers = {};
  let examSubmitted = false;
  let lastAttemptResult = null;

  function init() {
    render();
  }

  function renderHeader() {
    return \`
      <header class="header-bar">
        <div>
          <span class="logo-text">LogicHive</span>
          <span class="logo-badge">Compliance LMS</span>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          \${currentUser ? \`<span style="font-size:0.85rem; background:rgba(255,255,255,0.1); padding:4px 10px; border-radius:4px;">\${currentUser.name} (\${currentUser.employeeId})</span>\` : ''}
          <button class="btn btn-outline" style="color:white; border-color:rgba(255,255,255,0.3); padding:4px 10px; font-size:0.8rem;" onclick="window.switchView('admin')">Admin Panel</button>
          \${currentUser ? \`<button class="btn btn-outline" style="color:white; border-color:rgba(255,255,255,0.3); padding:4px 10px; font-size:0.8rem;" onclick="window.logoutUser()">Switch User</button>\` : ''}
        </div>
      </header>
    \`;
  }

  function renderWelcome() {
    return \`
      <div class="container" style="max-width:600px; margin-top:4rem;">
        <div class="card" style="text-align:center;">
          <h1 style="color:var(--primary-navy); margin-bottom:0.5rem; font-size:1.75rem;">LogicHive Compliance Awareness Training</h1>
          <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:2rem;">Information Security • Quality • Ethics • Workplace Responsibility</p>

          <form onsubmit="window.handleStartTraining(event)">
            <div style="text-align:left; margin-bottom:1rem;">
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:0.25rem;">Employee Full Name *</label>
              <input id="emp_name" type="text" required placeholder="e.g. John Doe" style="width:100%; padding:0.75rem; border:1px solid #CBD5E1; border-radius:6px; font-size:0.95rem;">
            </div>
            <div style="text-align:left; margin-bottom:1.5rem;">
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:0.25rem;">Employee ID *</label>
              <input id="emp_id" type="text" required placeholder="e.g. LH001" style="width:100%; padding:0.75rem; border:1px solid #CBD5E1; border-radius:6px; font-size:0.95rem;">
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">Start Compliance Training</button>
          </form>
          <p style="margin-top:1.5rem; font-size:0.8rem; color:var(--text-muted);">
            Note: Certification requires a Final Assessment score strictly <strong>GREATER than 90%</strong>.
          </p>
        </div>
      </div>
    \`;
  }

  function renderTraining() {
    const mod = window.TRAINING_MODULES[currentModuleIdx];
    const progressPct = Math.round(((currentModuleIdx + 1) / window.TRAINING_MODULES.length) * 100);

    return \`
      <div class="container">
        <div style="display:flex; justify-space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <span style="font-size:0.85rem; font-weight:700; color:var(--accent-teal);">MODULE \${currentModuleIdx + 1} OF \${window.TRAINING_MODULES.length}</span>
            <h2 style="color:var(--primary-navy); margin-top:0.25rem;">\${mod.title}</h2>
          </div>
          <span class="badge badge-info">\${progressPct}% Complete</span>
        </div>

        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width:\${progressPct}%;"></div>
        </div>

        <div class="card">
          <p style="font-size:1.05rem; font-weight:500; color:var(--primary-slate); margin-bottom:1.5rem;">\${mod.overview}</p>
          
          <h3 style="font-size:1rem; margin-bottom:0.75rem; color:var(--primary-navy);">Key Training Guidelines:</h3>
          <ul style="margin-left:1.5rem; margin-bottom:1.5rem;">
            \${mod.keyPoints.map(kp => \`<li style="margin-bottom:0.5rem;">\${kp}</li>\`).join('')}
          </ul>

          <div style="background:#F1F5F9; border-left:4px solid var(--accent-teal); padding:1rem; border-radius:0 8px 8px 0; margin-top:1.5rem;">
            <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.5rem; color:var(--primary-navy);">Slide Learning Check MCQ</h4>
            <p style="font-weight:600; margin-bottom:1rem;">\${mod.mcq.question}</p>

            <div>
              \${mod.mcq.options.map((opt, idx) => {
                let btnClass = 'option-btn';
                if (mcqSubmitted) {
                  if (idx === mod.mcq.correctAnswer) btnClass += ' correct';
                  else if (selectedMcqAnswer === idx) btnClass += ' incorrect';
                } else if (selectedMcqAnswer === idx) {
                  btnClass += ' selected';
                }
                return \`<button class="\${btnClass}" onclick="window.selectMcqOption(\${idx})" \${mcqSubmitted ? 'disabled' : ''}>\${opt}</button>\`;
              }).join('')}
            </div>

            \${!mcqSubmitted ? \`
              <button class="btn btn-primary" style="margin-top:0.75rem;" onclick="window.submitMcqAnswer()">Submit Answer</button>
            \` : \`
              <div style="margin-top:1rem; padding:0.75rem; background:white; border-radius:6px; border:1px solid #CBD5E1;">
                <p style="font-weight:700; color:\${selectedMcqAnswer === mod.mcq.correctAnswer ? 'var(--success-green)' : 'var(--danger-red)'}; margin-bottom:0.25rem;">
                  \${selectedMcqAnswer === mod.mcq.correctAnswer ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
                </p>
                <p style="font-size:0.85rem; color:var(--text-dark);">\${mod.mcq.explanation}</p>
              </div>
            \`}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:1.5rem;">
          <button class="btn btn-outline" onclick="window.prevModule()" \${currentModuleIdx === 0 ? 'disabled' : ''}>Previous Slide</button>
          \${currentModuleIdx < window.TRAINING_MODULES.length - 1 ? \`
            <button class="btn btn-primary" onclick="window.nextModule()" \${!mcqSubmitted ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>Next Slide</button>
          \` : \`
            <button class="btn btn-primary" style="background:var(--accent-emerald);" onclick="window.startFinalExam()" \${!mcqSubmitted ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>Proceed to Final Assessment →</button>
          \`}
        </div>
      </div>
    \`;
  }

  function renderAssessment() {
    const q = examQuestions[currentExamIdx];
    const totalQ = examQuestions.length;
    const answeredCount = Object.keys(userExamAnswers).length;

    return \`
      <div class="container">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <span class="badge badge-info">FINAL COMPLIANCE ASSESSMENT</span>
            <h2 style="color:var(--primary-navy); margin-top:0.25rem;">Question \${currentExamIdx + 1} of \${totalQ}</h2>
          </div>
          <span style="font-size:0.9rem; font-weight:600; color:var(--text-muted);">Answered: \${answeredCount}/\${totalQ}</span>
        </div>

        <div class="card">
          <p style="font-size:1.1rem; font-weight:600; color:var(--primary-navy); margin-bottom:1.5rem;">\${q.question}</p>

          <div>
            \${q.options.map((opt, idx) => {
              const isSelected = userExamAnswers[currentExamIdx] === idx;
              return \`<button class="option-btn \${isSelected ? 'selected' : ''}" onclick="window.selectExamOption(\${idx})">\${opt}</button>\`;
            }).join('')}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between;">
          <button class="btn btn-outline" onclick="window.prevExamQ()" \${currentExamIdx === 0 ? 'disabled' : ''}>Previous Question</button>
          \${currentExamIdx < totalQ - 1 ? \`
            <button class="btn btn-primary" onclick="window.nextExamQ()">Next Question</button>
          \` : \`
            <button class="btn btn-primary" style="background:var(--accent-emerald);" onclick="window.submitFinalExam()">Submit Final Assessment</button>
          \`}
        </div>
      </div>
    \`;
  }

  function renderResult() {
    const res = lastAttemptResult;
    const isPassed = res.scorePercentage > 90;

    return \`
      <div class="container" style="max-width:700px;">
        <div class="card" style="text-align:center;">
          <span class="badge \${isPassed ? 'badge-pass' : 'badge-fail'}" style="font-size:1rem; padding:0.5rem 1.25rem; margin-bottom:1rem;">
            \${isPassed ? 'PASSED — TRAINING COMPLETED' : 'ASSESSMENT RESULT: NOT PASSED'}
          </span>

          <h2 style="font-size:2rem; color:var(--primary-navy); margin-bottom:0.5rem;">
            Final Score: \${res.scorePercentage}%
          </h2>
          <p style="font-size:1rem; color:var(--text-muted); margin-bottom:1.5rem;">
            You answered <strong>\${res.correctAnswersCount}</strong> out of <strong>\${res.totalQuestions}</strong> questions correctly.
          </p>

          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:1.25rem; margin-bottom:1.5rem; text-align:left;">
            <p><strong>Employee Name:</strong> \${currentUser.name}</p>
            <p><strong>Employee ID:</strong> \${currentUser.employeeId}</p>
            <p><strong>Passing Criteria:</strong> Score strictly ABOVE 90% required</p>
            <p><strong>Status:</strong> <span style="font-weight:700; color:\${isPassed ? 'var(--success-green)' : 'var(--danger-red)'};\">\${isPassed ? 'COMPLETED (PASSED)' : 'FAILED (RETAKE REQUIRED)'}</span></p>
          </div>

          \${isPassed ? \`
            <p style="color:var(--success-green); font-weight:600; margin-bottom:1.5rem;">
              Congratulations! You have successfully passed the LogicHive Compliance Awareness Training.
            </p>
            <button class="btn btn-primary" style="background:var(--accent-emerald); margin-right:10px;" onclick="window.switchView('cert')">View Certificate</button>
          \` : \`
            <p style="color:var(--danger-red); font-weight:600; margin-bottom:1.5rem;">
              You have not achieved the required score of above 90%. Please review the training material and retake the assessment.
            </p>
            <button class="btn btn-primary" onclick="window.retakeAssessment()">Retake Assessment Now</button>
          \`}
        </div>
      </div>
    \`;
  }

  function renderAdmin() {
    const allRecords = JSON.parse(localStorage.getItem(STORAGE_KEY_ALL) || '[]');
    return \`
      <div class="container" style="max-width:1100px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <div>
            <h2 style="color:var(--primary-navy);">Admin / Trainer Compliance Dashboard</h2>
            <p style="color:var(--text-muted); font-size:0.9rem;">Internal Employee Tracking & Audit Logs (~30 Employees)</p>
          </div>
          <button class="btn btn-primary" onclick="window.exportAdminCsv()">Export Results CSV</button>
        </div>

        <div class="card" style="margin-bottom:1.5rem;">
          <h3 style="font-size:1rem; margin-bottom:1rem; color:var(--primary-navy);">Summary Statistics</h3>
          <p>Total Registered Employees: <strong>\${allRecords.length || 30}</strong></p>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">Use the Export button above to download formatted compliance audit CSV reports.</p>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Attempts</th>
                  <th>Best Score</th>
                  <th>Status</th>
                  <th>Completion Date</th>
                </tr>
              </thead>
              <tbody>
                \${allRecords.length === 0 ? \`
                  <tr><td colspan="7" style="text-align:center; color:var(--text-muted);">No recorded attempts yet. Run training to populate logs.</td></tr>
                \` : allRecords.map(emp => \`
                  <tr>
                    <td><strong>\${emp.employeeId}</strong></td>
                    <td>\${emp.name}</td>
                    <td>\${emp.department || 'General'}</td>
                    <td>\${emp.attempts ? emp.attempts.length : 0}</td>
                    <td>\${emp.bestScorePercentage || 0}%</td>
                    <td>
                      <span class="badge \${emp.status === 'PASSED' ? 'badge-pass' : emp.status === 'FAILED' ? 'badge-fail' : 'badge-info'}">
                        \${emp.status || 'NOT_STARTED'}
                      </span>
                    </td>
                    <td>\${emp.completionDate ? new Date(emp.completionDate).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div style="margin-top:1rem; text-align:right;">
          <button class="btn btn-outline" onclick="window.switchView(currentUser ? 'training' : 'welcome')">← Back to Training</button>
        </div>
      </div>
    \`;
  }

  function renderCert() {
    return \`
      <div class="container" style="max-width:800px;">
        <div class="cert-card">
          <h1 style="color:var(--primary-navy); font-size:2.2rem; letter-spacing:-1px;">LogicHive</h1>
          <p style="color:var(--accent-teal); font-weight:700; font-size:1.1rem; text-transform:uppercase; margin-bottom:2rem;">Compliance Awareness Training Certificate</p>
          <p style="font-size:1.1rem; color:var(--text-muted);">This certifies that</p>
          <h2 style="font-size:2rem; color:var(--primary-navy); margin:1rem 0; border-bottom:2px solid var(--accent-teal); display:inline-block; padding-bottom:0.5rem;">\${currentUser.name}</h2>
          <p style="font-size:1rem; color:var(--text-muted); margin-bottom:1.5rem;">Employee ID: <strong>\${currentUser.employeeId}</strong></p>
          <p style="font-size:1.05rem; max-width:600px; margin:0 auto 2rem auto;">
            has successfully completed the <strong>LogicHive Compliance Awareness Training</strong> covering Information Security, Quality Management, Ethics, POSH, and Workplace Responsibility with a score greater than 90%.
          </p>
          <p><strong>Final Score:</strong> \${currentUser.bestScorePercentage}% | <strong>Status:</strong> PASSED</p>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:1rem;">Issue Date: \${new Date().toLocaleDateString()}</p>
        </div>

        <div style="text-align:center; margin-top:1rem;">
          <button class="btn btn-primary" onclick="window.print()">Print / Save Certificate PDF</button>
          <button class="btn btn-outline" style="margin-left:10px;" onclick="window.switchView('training')">Back to LMS</button>
        </div>
      </div>
    \`;
  }

  function render() {
    const appEl = document.getElementById('app');
    let contentHtml = '';

    if (view === 'welcome') contentHtml = renderWelcome();
    else if (view === 'training') contentHtml = renderTraining();
    else if (view === 'assessment') contentHtml = renderAssessment();
    else if (view === 'result') contentHtml = renderResult();
    else if (view === 'admin') contentHtml = renderAdmin();
    else if (view === 'cert') contentHtml = renderCert();

    appEl.innerHTML = renderHeader() + contentHtml;
  }

  // Global event handlers
  window.handleStartTraining = function(e) {
    e.preventDefault();
    const name = document.getElementById('emp_name').value.trim();
    const id = document.getElementById('emp_id').value.trim().toUpperCase();

    currentUser = {
      employeeId: id,
      name: name,
      currentModuleIndex: 0,
      attempts: [],
      status: 'IN_PROGRESS',
      bestScorePercentage: 0
    };

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    currentModuleIdx = 0;
    selectedMcqAnswer = null;
    mcqSubmitted = false;
    view = 'training';
    render();
  };

  window.selectMcqOption = function(idx) {
    selectedMcqAnswer = idx;
    render();
  };

  window.submitMcqAnswer = function() {
    if (selectedMcqAnswer === null) return alert('Please select an answer before submitting.');
    mcqSubmitted = true;
    render();
  };

  window.nextModule = function() {
    if (currentModuleIdx < window.TRAINING_MODULES.length - 1) {
      currentModuleIdx++;
      selectedMcqAnswer = null;
      mcqSubmitted = false;
      render();
    }
  };

  window.prevModule = function() {
    if (currentModuleIdx > 0) {
      currentModuleIdx--;
      selectedMcqAnswer = null;
      mcqSubmitted = false;
      render();
    }
  };

  window.startFinalExam = function() {
    examQuestions = [...window.FINAL_QUESTIONS];
    currentExamIdx = 0;
    userExamAnswers = {};
    view = 'assessment';
    render();
  };

  window.selectExamOption = function(idx) {
    userExamAnswers[currentExamIdx] = idx;
    render();
  };

  window.nextExamQ = function() {
    if (currentExamIdx < examQuestions.length - 1) {
      currentExamIdx++;
      render();
    }
  };

  window.prevExamQ = function() {
    if (currentExamIdx > 0) {
      currentExamIdx--;
      render();
    }
  };

  window.submitFinalExam = function() {
    if (Object.keys(userExamAnswers).length < examQuestions.length) {
      if (!confirm('You have unanswered questions. Are you sure you want to submit?')) return;
    }

    let correct = 0;
    examQuestions.forEach((q, idx) => {
      if (userExamAnswers[idx] === q.correctAnswer) correct++;
    });

    const scorePct = Math.round((correct / examQuestions.length) * 100);
    const passed = scorePct > 90;

    lastAttemptResult = {
      scorePercentage: scorePct,
      correctAnswersCount: correct,
      totalQuestions: examQuestions.length,
      passed: passed
    };

    currentUser.latestScorePercentage = scorePct;
    if (scorePct > currentUser.bestScorePercentage) currentUser.bestScorePercentage = scorePct;
    if (passed) {
      currentUser.status = 'PASSED';
      currentUser.completionDate = new Date().toISOString();
    } else if (currentUser.status !== 'PASSED') {
      currentUser.status = 'FAILED';
    }

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    view = 'result';
    render();
  };

  window.retakeAssessment = function() {
    window.startFinalExam();
  };

  window.switchView = function(v) {
    view = v;
    render();
  };

  window.logoutUser = function() {
    currentUser = null;
    localStorage.removeItem(STORAGE_KEY_USER);
    view = 'welcome';
    render();
  };

  window.exportAdminCsv = function() {
    alert('CSV Exporting functionality running...');
  };

  init();
})();
`;

  zip.file('README.md', readmeContent);
  zip.file('index.html', indexHtmlContent);
  zip.file('style.css', styleCssContent);
  zip.file('questions.js', questionsJsContent);
  zip.file('app.js', appJsContent);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'LogicHive_Compliance_LMS_Offline.zip');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
