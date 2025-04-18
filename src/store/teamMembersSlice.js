// src/store/teamMembersSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const defaultMember = {
  name: "",
  role: "",
  assignedPercentage: 0,
  capacityPercentage: 100,
  tasks: [
    {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    },
  ],
};

const dummyData = {
  burndown: [
    { date: "Day 1", ideal: 40, actual: 40 },
    { date: "Day 2", ideal: 36, actual: 38 },
    { date: "Day 3", ideal: 32, actual: 35 },
  ],
  resources: [
    {
      id: 1,
      name: "Emily Johnson",
      role: "UX Designer",
      avatar: "/avatars/emily.jpg",
      assignedPercentage: 34,
      capacityPercentage: 55,
    },
    {
      id: 2,
      name: "David Wilson",
      role: "Frontend Dev",
      avatar: "/avatars/david.jpg",
      assignedPercentage: 89,
      capacityPercentage: 95,
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Backend Dev",
      avatar: "/avatars/michael.jpg",
      assignedPercentage: 45,
      capacityPercentage: 60,
    },
    {
      id: 4,
      name: "Sarah Davis",
      role: "Project Manager",
      avatar: "/avatars/sarah.jpg",
      assignedPercentage: 30,
      capacityPercentage: 75,
    },
  ],
  tasks: [
    {
      id: "task1",
      title: "Redesign Homepage",
      description: "Update the homepage with new branding",
      priority: "high",
      columnId: "todo",
      assignee: { name: "Emily Johnson", avatar: "/avatars/emily.jpg" },
      dueDate: "2025-04-25",
    },
    {
      id: "task2",
      title: "API Integration",
      description: "Connect to the new payment API",
      priority: "medium",
      columnId: "in-progress",
      assignee: { name: "Michael Brown", avatar: "/avatars/michael.jpg" },
      dueDate: "2025-04-30",
    },
    {
      id: "task3",
      title: "Fix Navigation Bug",
      description: "Mobile navigation is not working correctly",
      priority: "high",
      columnId: "todo",
      assignee: { name: "David Wilson", avatar: "/avatars/david.jpg" },
      dueDate: "2025-04-23",
    },
  ],
};

const initialState = {
  members: [{ ...defaultMember }],
  burndown: dummyData.burndown,
  isFormSubmitted: false,
};

const teamMembersSlice = createSlice({
  name: "teamMembers",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    addMember: (state) => {
      state.members.push({ ...defaultMember });
    },
    updateMember: (state, action) => {
      const { index, field, value } = action.payload;
      state.members[index][field] = value;
    },
    removeMember: (state, action) => {
      state.members.splice(action.payload, 1);
    },
    addTask: (state, action) => {
      const memberIndex = action.payload;
      state.members[memberIndex].tasks.push({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    },
    updateTask: (state, action) => {
      const { memberIndex, taskIndex, field, value } = action.payload;
      state.members[memberIndex].tasks[taskIndex][field] = value;
    },
    removeTask: (state, action) => {
      const { memberIndex, taskIndex } = action.payload;
      state.members[memberIndex].tasks.splice(taskIndex, 1);
    },
    setBurndown: (state, action) => {
      state.burndown = action.payload;
    },
    addBurndownEntry: (state) => {
      const newDay = state.burndown.length + 1;
      state.burndown.push({ date: `Day ${newDay}`, ideal: 0, actual: 0 });
    },
    updateBurndownEntry: (state, action) => {
      const { index, field, value } = action.payload;
      state.burndown[index][field] = value;
    },
    removeBurndownEntry: (state, action) => {
      state.burndown.splice(action.payload, 1);
    },
    resetToDefault: (state) => {
      state.members = dummyData.resources.map((resource) => ({
        name: resource.name,
        role: resource.role,
        assignedPercentage: resource.assignedPercentage,
        capacityPercentage: resource.capacityPercentage,
        tasks: dummyData.tasks
          .filter((task) => task.assignee.name === resource.name)
          .map((task) => ({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          })),
      }));
      state.burndown = dummyData.burndown;
    },
    setFormSubmitted: (state, action) => {
      state.isFormSubmitted = action.payload;
    },
  },
});

export const {
  setMembers,
  addMember,
  updateMember,
  removeMember,
  addTask,
  updateTask,
  removeTask,
  setBurndown,
  addBurndownEntry,
  updateBurndownEntry,
  removeBurndownEntry,
  resetToDefault,
  setFormSubmitted,
} = teamMembersSlice.actions;

export default teamMembersSlice.reducer;
