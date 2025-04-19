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
      avatar: "https://i.pravatar.cc/300?img=20",
      assignedPercentage: 34,
      capacityPercentage: 55,
    },
    {
      id: 2,
      name: "David Wilson",
      role: "Frontend Dev",
      avatar: "https://i.pravatar.cc/300?img=8",
      assignedPercentage: 89,
      capacityPercentage: 95,
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Backend Dev",
      avatar: "https://i.pravatar.cc/300?img=9",
      assignedPercentage: 45,
      capacityPercentage: 60,
    },
    {
      id: 4,
      name: "Sarah Davis",
      role: "Project Manager",
      avatar: "https://i.pravatar.cc/300?img=16",
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
  teamSize: 0,
  resources: [],
  tasks: [],
  burndown: [],
  completedTasks: { done: 0, total: 0 },
  hoursSpent: { total: 0, thisWeek: 0 },
  budget: { spent: 0, total: 0 },
  formMembers: [{ ...defaultMember }],
  formBurndown: dummyData.burndown,
  isFormSubmitted: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTeamSize: (state, action) => {
      state.teamSize = action.payload;
    },
    // Existing dashboard reducers
    setResources: (state, action) => {
      state.resources = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setDashboardStats: (state, action) => {
      state.burndown = action.payload.burndown;
      state.completedTasks = action.payload.completedTasks;
      state.hoursSpent = action.payload.hoursSpent;
      state.budget = action.payload.budget;
    },

    setFormMembers: (state, action) => {
      state.formMembers = action.payload;
    },
    addFormMember: (state) => {
      state.formMembers.push({ ...defaultMember });
    },
    updateFormMember: (state, action) => {
      const { index, field, value } = action.payload;
      state.formMembers[index][field] = value;
    },
    removeFormMember: (state, action) => {
      state.formMembers.splice(action.payload, 1);
    },
    addFormTask: (state, action) => {
      const memberIndex = action.payload;
      state.formMembers[memberIndex].tasks.push({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    },
    updateFormTask: (state, action) => {
      const { memberIndex, taskIndex, field, value } = action.payload;
      state.formMembers[memberIndex].tasks[taskIndex][field] = value;
    },
    removeFormTask: (state, action) => {
      const { memberIndex, taskIndex } = action.payload;
      state.formMembers[memberIndex].tasks.splice(taskIndex, 1);
    },
    setFormBurndown: (state, action) => {
      state.formBurndown = action.payload;
    },
    addFormBurndownEntry: (state) => {
      const newDay = state.formBurndown.length + 1;
      state.formBurndown.push({ date: `Day ${newDay}`, ideal: 0, actual: 0 });
    },
    updateFormBurndownEntry: (state, action) => {
      const { index, field, value } = action.payload;
      state.formBurndown[index][field] = value;
    },
    removeFormBurndownEntry: (state, action) => {
      state.formBurndown.splice(action.payload, 1);
    },
    resetFormToDefault: (state) => {
      state.formMembers = dummyData.resources.map((resource) => ({
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
      state.formBurndown = dummyData.burndown;
    },
    setFormSubmitted: (state, action) => {
      state.isFormSubmitted = action.payload;
    },
  },
});

export const {
  setResources,
  setTasks,
  setDashboardStats,
  setFormMembers,
  addFormMember,
  updateFormMember,
  removeFormMember,
  addFormTask,
  updateFormTask,
  removeFormTask,
  setFormBurndown,
  addFormBurndownEntry,
  updateFormBurndownEntry,
  removeFormBurndownEntry,
  resetFormToDefault,
  setFormSubmitted,
  setTeamSize,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
