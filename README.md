# 💼 Job Tracker — Job Application Management Dashboard

> **Track every opportunity. Stay organized. Get closer to your next role.**

A modern, responsive job application tracker built with React and Vite to help job seekers organize applications, monitor hiring progress, and manage their job search from one dashboard.

🔗 **Live Demo:** [View Job Tracker](https://job-tracker-swart-eight.vercel.app)
📦 **GitHub Repository:** [Arman1263/Job-Tracker](https://github.com/Arman1263/Job-Tracker)

---

## 📸 Project Preview
**![Project Screenshot]**(images/screenshot.png)



*The Job Tracker dashboard with application statistics, status filters, job listings, and application details.*

---

## ✨ Features

- **📊 Dashboard Overview** — View application statistics and track progress across different hiring stages.
- **➕ Application Management** — Add, edit, view, and delete job applications.
- **🔎 Search & Filters** — Find opportunities by job title, company, or location and filter by application status.
- **🏷️ Application Status Tracking** — Organize opportunities by statuses such as Saved, Applied, Interview, Offer, and Rejected.
- **📝 Application Details** — Keep relevant job information, notes, and recruiter details organized.
- **💾 Persistent Storage** — Save application data in browser `localStorage` so it remains available after refreshing or reopening the site in the same browser.
- **♻️ Safe Demo Restoration** — Restore missing sample listings without overwriting existing applications or creating duplicate demo entries.
- **🛡️ Clear-All Confirmation** — Require explicit confirmation before clearing all tracked applications.
- **📱 Responsive Interface** — Use the dashboard across desktop and mobile screen sizes.
- **🎯 Helpful Empty States** — Receive guidance when no applications match the current search or filters.

---

## 🛠️ Tech Stack

| Technology           | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| React                | Component-based user interface                  |
| Vite                 | Development server and production build tooling |
| JavaScript (ES6+)    | Application logic and interactions              |
| CSS3                 | Styling and responsive layouts                  |
| Browser localStorage | Client-side application persistence             |
| ESLint               | Code quality and linting                        |
| Git & GitHub         | Version control and source code hosting         |
| Vercel               | Production deployment                           |

---

## 🧠 Development Approach

This project was developed using an AI-assisted workflow that combined reverse-engineering tools, AI-powered coding, and manual verification.

### 1. Reverse Engineering Anything (REA)

Used **Reverse Engineering Anything (REA)** through its MCP integration to inspect and analyze the starter JavaScript application. This helped establish an understanding of the existing project structure before implementation.&#x20;

### 2. Google Antigravity

Used **Google Antigravity** as the development environment to implement the React application, organize components, refine application behavior, and improve the interface.

### 3. ChatGPT

Used **ChatGPT** as a development assistant for planning, breaking work into manageable steps, generating and refining implementation prompts, reviewing logic, troubleshooting, and preparing a structured manual testing checklist.

### 4. Validation and Deployment

Validated the application through manual functional checks and ran ESLint and the production build. The project was then pushed to GitHub and deployed on Vercel.

**Development principle:** AI-assisted implementation was paired with code inspection, iterative testing, and explicit verification of important data-handling behavior.

---

## ⚙️ Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Arman1263/Job-Tracker.git
```

**2. Navigate to the project directory**

```bash
cd Job-Tracker
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL printed in your terminal.

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create the production build          |
| `npm run lint`    | Run ESLint checks                    |
| `npm run preview` | Preview the production build locally |

---

## 💾 Data Storage

The application currently uses browser `localStorage` for persistence.

- Application records are stored locally in the browser.
- Data is not automatically synchronized across browsers or devices.
- Clearing browser site data may remove saved applications.
- The application does not currently use a backend database or user authentication.

**Recommendation:** Export or back up important application information before clearing browser data.

---

## 🧪 Validation

The following checks were performed during development:

- Adding, editing, and deleting applications
- Searching and filtering application records
- Verifying persistence after refresh and reopening the application
- Checking responsive layout and empty states
- Verifying that demo restoration preserves existing applications
- Checking the Clear All confirmation dialog
- Running `npm run lint`
- Running `npm run build`

The lint and production build completed successfully during development.

---

## 🚀 Deployment

The application is deployed on **Vercel** and connected to the GitHub repository.

🔗 **Live Application:** [https://job-tracker-swart-eight.vercel.app](https://job-tracker-swart-eight.vercel.app)

---

## 🔮 Future Improvements

- Export and import applications using CSV or JSON
- Add a backend database and user authentication
- Synchronize applications across devices
- Add reminders for interviews and follow-ups
- Visualize application trends over time
- Introduce automated tests for critical functionality

---

## 👨‍💻 Author

**Arman Shikalgar**

- GitHub: [@Arman1263](https://github.com/Arman1263)
- Project Repository: [Job-Tracker](https://github.com/Arman1263/Job-Tracker)
- Live Demo: [Job Tracker on Vercel](https://job-tracker-swart-eight.vercel.app)

---

⭐ If you find this project useful, consider giving the repository a star.

*Built with React, iterative development, and AI-assisted engineering.*
