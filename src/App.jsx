// src/App.jsx
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import DashboardLayout from "./layout/DashboardLayout";
import "./index.css";

// Context
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { TeamProvider } from "./context/TeamContext";

// Lazy-loaded pages
const CreateTeamForm = lazy(() => import("./Componenetss/CreateTeamForm"));
const TeamMembersForm = lazy(() => import("./Componenetss/TeamMembersForm"));
const TaskAssignmentForm = lazy(() =>
  import("./Componenetss/forms/TaskAssignmentForm")
);
const Dashboard = lazy(() => import("./Componenetss/Dashboard"));

// Optional fallback loader
const FallbackLoader = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`flex justify-center items-center h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } `}
    >
      <div className="flex items-center space-x-2 text-center">
        <div className="w-6 h-6 border-4 border-t-transparent border-gray-500 dark:border-gray-300 rounded-full animate-spin"></div>
        <span className={`${isDarkMode ? "text-gray-600" : "text-black"}`}>
          Loading...
        </span>
      </div>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <TeamProvider>
        <div className="w-full">
          <Router>
            <Suspense fallback={<FallbackLoader />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                  }
                >
                  <Route index element={<CreateTeamForm />} />
                  
                  <Route path="team-members" element={<TeamMembersForm />} />
                  <Route path="assign-tasks" element={<TaskAssignmentForm />} />
                </Route>
                <Route
                  path="/dashboard"
                  element={
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  }
                />
              </Routes>
            </Suspense>
          </Router>
        </div>
      </TeamProvider>
    </ThemeProvider>
  );
}

export default App;
