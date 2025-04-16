// src/store/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { addTask, updateTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
