import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completedTasks: { done: 0, total: 0 },
  hoursSpent: { total: 0, thisWeek: 0 },
  teamMembers: [],
  budget: { spent: 0, total: 0 },
  burndown: [
    { date: "Day 1", ideal: 40, actual: 40 },
    { date: "Day 2", ideal: 36, actual: 38 },
    { date: "Day 3", ideal: 32, actual: 35 },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardStats: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDashboardStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
