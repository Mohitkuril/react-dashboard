// src/components/Dashboard.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import TaskBoard from "./TaskBoard";
import TaskForm from "./TaskForm";
import StatusCards from "../components/StatusCards";
import BurndownChart from "./BurndownChart";
import ResourceAllocation from "./ResourceAllocation";
import DraggableTaskBoard from "./DraggableTaskBoard";
import GanttChart from "./GanttChart";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = React.useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="space-y-8">
      {/* <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 p-6">
        Project Dashboard
      </h2>

      {/* <TaskForm onAddTask={handleAddTask} />

      <TaskBoard tasks={tasks} /> */}

      {/* <div className="p-6 max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Data Visualization (Placeholder)
        </h3>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Gantt Chart
            </h4>
            <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mt-2"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Burndown Chart
            </h4>
            <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mt-2"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Resource Allocation
            </h4>
            <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mt-2"></div>
          </div>
        </div>
      </div>  */}
      <StatusCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Burndown Chart */}
        <BurndownChart />

        {/* Resource Allocation */}
        <ResourceAllocation />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6">
        {/* Advanced Task Board with Drag & Drop and Dependencies */}
        <DraggableTaskBoard />

        {/* Round-Robin Component Architecture Demo */}
        {/* <DispatcherDemo /> */}

        {/* Gantt Chart */}
        <GanttChart />

        {/* Availability Calendar */}
        {/* <AvailabilityCalendar /> */}
      </div>
    </div>
  );
};

export default Dashboard;
