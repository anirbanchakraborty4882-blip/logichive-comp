# Internal Compliance Awareness Training LMS

A professional, responsive, interactive corporate LMS for employees covering Information Security, Quality Management, Company Ethics, POSH, Clear Desk/Screen, and Employee Responsibilities.

---

## 1. How to Start the LMS

### Web Application (React + Vite)
1. Launch the web application in your browser.
2. No server setup or external database configuration is required.
3. All employee profiles, attempts, and certification history are saved automatically in your browser's `localStorage`.

### Standalone Offline Installation (.zip)
1. Click **"Offline Zip Package"** in the top navigation bar or Admin Dashboard.
2. Download and unzip `Compliance_LMS_Offline.zip`.
3. Double-click `index.html` in any web browser on any offline computer.

---

## 2. How Employees Use the LMS

1. **Enter Profile Details**: On Screen 1, enter Employee Name and Employee ID (e.g. `LH001`), or select a pre-populated profile from the dropdown list.
2. **Review Training Modules**: Go through the 10 training slide modules sequentially.
3. **Mandatory Slide Learning Check**: At the end of every slide, answer the multiple-choice learning check question. Immediate answer validation and policy explanations are provided.
4. **Final Assessment**: Complete the 25-question final assessment at the end of all modules.

---

## 3. How the Assessment & 90% Passing Rule Works

- **Questions**: 25 randomized policy questions covering all 10 training modules.
- **Strict Passing Rule**:
  - **PASS**: Final score **strictly GREATER than 90%** (e.g., 91% - 100%, or 23/25 correct = 92%).
  - **FAIL**: Final score **90% or below** (e.g., 22/25 correct = 88%).
- **Retake Requirement**: If an employee scores 90% or lower, they are marked as **FAILED**. They must review the material and click **"Retake Assessment"** until achieving > 90%.
- **Certification**: Achieving a passing score (> 90%) unlocks the downloadable & printable **LogicHive Certificate of Completion**.

---

## 4. How to Access the Admin Dashboard

1. Click the **"Admin Dashboard"** button in the top navigation header.
2. View real-time compliance logs for **~30 pre-populated employees** across departments (Engineering, QA, Security, HR, Operations, Customer Success, Product Management).
3. Check summary metrics: Total Employees, Passed (>90%), Failed (<=90%), In Progress, Not Started, Average Score, and Pass Rate %.
4. Search employees by name, ID, or department, or filter by status tabs.
5. Click the **Eye icon** next to any employee to inspect their attempt log history.

---

## 5. How to Export & Sync Results

- **Export Results CSV**: Click **"Export CSV"** in the Admin Dashboard to download `LogicHive_Compliance_Training_Results.csv` containing complete audit trails.
- **Export / Import JSON Data**: Backup complete employee data to JSON and import it on another computer to consolidate results from multiple trainers.

---

## 6. Resetting Local Data & Adding Employees

- **Reset Seeds**: Click **"Reset Demo Seeds"** in the Admin Dashboard footer to revert all employee records back to default initial state.
- **Add Employee**: Click **"Add Employee"** in the Admin Dashboard header to add a new profile to the active roster.
