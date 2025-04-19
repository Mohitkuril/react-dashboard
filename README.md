# 🧠 Collaborative Project Management Dashboard

A responsive and intelligent **frontend-only** dashboard built with **React**, **Tailwind CSS v4**, and **Redux** to simulate real-world project collaboration. It includes task tracking, team availability, dynamic resource allocation, and a clean UI optimized for performance and dark mode.

---

## 🚀 Features

- ✅ Dynamic Team Creation & Resource Management
- 🔄 Real-time Drag-and-Drop Task Board
- 📈 Burndown Chart with Auto-Generated Progress
- 🧮 Resource Load Visualization
- 🌓 Global Dark Mode Toggle via React Context
- 🧩 Round-Robin Component Architecture

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Mohitkuril/react-dashboard.git
cd react-dashboard
```

### 2. Install Dependencies

```bash
yarn install
```

> ⚠️ Requires **Node.js v18+** and **Yarn v1.22+**

### 3. Start the App

```bash
yarn dev
```

Visit `http://localhost:5173` to view the dashboard.

---

## 🏗️ Architecture

```
src
├── assets
├── components
│   ├── AvailabilityCalendar.jsx
│   ├── Dashboard.jsx
│   ├── DraggableTaskBoard.jsx
│   ├── NotFoundPage.jsx
│   ├── StatusCards.jsx
│   ├── TaskBoard.jsx
│   ├── charts
│   │   ├── BurndownChart.jsx
│   │   ├── GanttChart.jsx
│   │   └── ResourceAllocation.jsx
│   ├── forms
│   │   ├── CreateTeamForm.jsx
│   │   ├── TaskForm.jsx
│   │   └── TeamMembersForm.jsx
│   └── hooks
│       └── useDataProvider.jsx
├── context
│   ├── ProjectContext.jsx
│   ├── TeamContext.jsx
│   └── ThemeContext.jsx
├── layout
│   ├── DashboardLayout.jsx
│   ├── FormLayout.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   └── TopBar.jsx
└── store
    ├── dashboardSlice.js
    ├── store.js
    ├── taskBoardSlice.js
    ├── taskSlice.js
    ├── teamMembersSlice.js
    └── teamSlice.js


---

## 💡 Key Decisions

- 🧠 **Redux Toolkit** used for managing task, team, and resource state globally.
- 🎨 **React Context** used only for UI-related state (theme toggle).
- 💾 **sessionStorage** used for storing form data without a backend.
- 🧮 **TeamMembersForm** collects team, task, and burndown info in one place.
- 🔄 **Fallback dummy data** shows dashboard UI even if user skips forms.
- 🌘 **Tailwind v4 dark mode** is applied using conditionally rendered classNames.

---

## ⚙️ Performance Considerations

- 🔄 Used `React.memo`, `useMemo`in high-impact areas like charts and boards.
- 🧩 Separated slices (`teamSlice`, `taskSlice`, `dashboardSlice`) to avoid global re-renders.
- ⚡ Lazy computed values for chart data, resource load, and dependency check.
- 💾 Synced `sessionStorage` and Redux on mount only—no runtime writes on every change.
- 💡 Smart form structures reduce unnecessary rerenders via controlled components.

---

## ❗ Challenges Faced

- 🧲 Implemented real-time task drag-and-drop using React DnD.
- 🔁 Added circular task dependency detection via DFS cycle check.
- 💡 Designed flexible forms with dynamic fields (roles, percentages).
- 🌘 Handled Tailwind v4 dark mode compatibility in all layout views.
- ⚙️ Kept Redux + sessionStorage in sync without race conditions or infinite loops.
- 🗂️ Coordinated layout with a sidebar, header, and responsive main content.

---
```
