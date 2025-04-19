import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./teamSlice";
import taskReducer from "./taskSlice"; // Import the task slice
import dashboardReducer from "./dashboardSlice";
import taskBoardReducer from "./taskBoardSlice";

const store = configureStore({
  reducer: {
    team: teamReducer,
    tasks: taskReducer,
    dashboard: dashboardReducer,
    taskBoard: taskBoardReducer,
  },
});

export default store;
