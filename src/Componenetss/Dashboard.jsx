// src/components/Dashboard.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";
import TaskBoard from "./TaskBoard";
import TaskForm from "./TaskForm";
import StatusCards from "../components/StatusCards";
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
      {/* Section with id="dashboard" for scrolling */}
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

      {/* Section with id="tasks" for scrolling */}
      {/* <div id="tasks">
        <TaskBoard tasks={tasks} />
      </div> */}

      {/* Section with id="timeline" for scrolling */}
      <div id="timeline">
        <GanttChart />
      </div>

      {/* Section with id="availability" for scrolling */}
      <div id="availability">
        <AvailabilityCalendar team={team} />
      </div>

      {/* Other sections like BurndownChart, ResourceAllocation, etc. */}
    </div>
  );
};

export default Dashboard;
