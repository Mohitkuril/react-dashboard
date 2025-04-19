import { createContext, useContext, useState } from "react";
import dayjs from "dayjs";

const ProjectContext = createContext();

const defaultMonth = dayjs().format("MMMM YYYY");

export const ProjectProvider = ({ children }) => {
  const [team, setTeam] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [calendar, setCalendar] = useState({
    month: dayjs().format("MMMM YYYY"),
    team: [
      { name: "Alice", color: "#60a5fa" },
      { name: "Bob", color: "#f472b6" },
    ],
    events: [
      {
        id: 1,
        member: "Alice",
        title: "Available",
        days: [3, 4, 9],
        color: "#60a5fa",
      },
      {
        id: 2,
        member: "Bob",
        title: "Busy",
        days: [10, 11],
        color: "#f472b6",
      },
    ],
  });
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
  ]);

  const navigation = [
    { id: "dashboard", title: "Dashboard", icon: "ri-dashboard-line" },
    { id: "chart", title: "Chart", icon: "ri-calendar-line" },
    { id: "tasks", title: "Tasks", icon: "ri-task-line" },
    { id: "timeline", title: "Timeline", icon: "ri-timeline-view" },
    { id: "availability", title: "Availability", icon: "ri-team-line" },
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
        calendar,
        setCalendar,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
