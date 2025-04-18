// src/components/Dashboard.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";
import TaskBoard from "./TaskBoard";
import TaskForm from "./TaskForm";
import StatusCards from "./StatusCards";
import BurndownChart from "./BurndownChart";
import ResourceAllocation from "./ResourceAllocation";
import DraggableTaskBoard from "./DraggableTaskBoard";
import GanttChart from "./GanttChart";
import AvailabilityCalendar from "./AvailabilityCalendar";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { tasks, team } = useProject();

  return (
    <div className="space-y-8">
      <div id="dashboard">
        <StatusCards />
      </div>
      <div id="chart" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BurndownChart />
        <ResourceAllocation />
      </div>
      <div id="tasks" className="mt-6 grid grid-cols-1 gap-6">
        <DraggableTaskBoard />
      </div>

      <div id="timeline">
        <GanttChart />
      </div>

      <div id="availability">
        <AvailabilityCalendar team={team} />
      </div>
    </div>
  );
};

export default Dashboard;
