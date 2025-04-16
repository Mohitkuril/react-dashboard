// contexts/ProjectContext.jsx
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [team, setTeam] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [ganttChart, setGanttChart] = useState([
    {
      id: 1,
      task: "Task 1",
      startDay: 0,
      duration: 7,
      color: "#4CAF50", // Example color
    },
    {
      id: 2,
      task: "Task 2",
      startDay: 7,
      duration: 14,
      color: "#FF9800",
    },
    {
      id: 3,
      task: "Task 3",
      startDay: 14,
      duration: 7,
      color: "#2196F3",
    },
  ]); // Example data, replace with your actual data source

  const navigation = [
    { id: "dashboard", title: "Dashboard", icon: "ri-dashboard-line" },
    { id: "timeline", title: "Timeline", icon: "ri-timeline-view" },
    { id: "tasks", title: "Tasks", icon: "ri-task-line" },
    { id: "resources", title: "Resources", icon: "ri-team-line" },
  ];

  return (
    <ProjectContext.Provider
      value={{
        team,
        setTeam,
        tasks,
        setTasks,
        ganttChart,
        setGanttChart,
        navigation,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
