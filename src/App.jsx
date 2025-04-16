// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import StatusCards from "./components/StatusCards";
import BurndownChart from "./Componenetss/BurndownChart";
import ResourceAllocation from "./Componenetss/ResourceAllocation";
import TaskBoard from "./components/TaskBoard";
import ComponentArchitecture from "./components/ComponentArchitecture";
import ProjectTimeline from "./components/ProjectTimeline";
import TeamAvailability from "./components/TeamAvailability";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import CreateTeamForm from "./Componenetss/CreateTeamForm";
import Layout from "./layout/Layout";
import ThemeProvider from "./context/ThemeContext";
import TeamMembersForm from "./Componenetss/TeamMembersForm";
import Dashboard from "./Componenetss/Dashboard";
import TaskAssignmentForm from "./Componenetss/forms/TaskAssignmentForm";
import { TeamProvider } from "./context/TeamContext";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
