import React, { createContext, useContext, useState } from "react";

// Create the context
const TeamContext = createContext();

// Hook to use the context
export const useTeamContext = () => useContext(TeamContext);

// Provider component
export const TeamProvider = ({ children }) => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Add team info
  const updateTeamInfo = (name) => {
    setTeamName(name);
  };
  const addTeamMember = (newMember) => {
    setTeamMembers((prevMembers) => [...prevMembers, newMember]);
  };
  // Add or update team members
  const updateTeamMembers = (members) => {
    setTeamMembers(members);
  };

  // Add or update tasks
  const updateTasks = (taskList) => {
    setTasks(taskList);
  };

  return (
    <TeamContext.Provider
      value={{
        teamName,
        teamMembers,
        tasks,
        updateTeamInfo,
        updateTeamMembers,
        updateTasks,
        addTeamMember,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
