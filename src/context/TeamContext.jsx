import React, { createContext, useContext, useState } from "react";

const TeamContext = createContext();

export const useTeamContext = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const updateTeamInfo = (name) => {
    setTeamName(name);
  };
  const addTeamMember = (newMember) => {
    setTeamMembers((prevMembers) => [...prevMembers, newMember]);
  };
  const updateTeamMembers = (members) => {
    setTeamMembers(members);
  };

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
