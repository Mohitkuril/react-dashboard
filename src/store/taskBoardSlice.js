import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [
    { id: "backlog", title: "Backlog" },
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ],
  tasks: [
    {
      id: 1,
      title: "Set up project repository",
      description: "Initialize git repo and set up project structure",
      priority: "medium",
      columnId: "done",
      assignee: { name: "Alex", avatar: "https://i.pravatar.cc/300?img=1" },
      dueDate: "2023-08-10",
    },
    {
      id: 2,
      title: "Create API endpoints",
      description: "Develop RESTful API endpoints for user authentication",
      priority: "high",
      columnId: "inprogress",
      assignee: { name: "Jamie", avatar: "https://i.pravatar.cc/300?img=2" },
      dueDate: "2023-08-20",
    },
    {
      id: 3,
      title: "Design database schema",
      description: "Create database models and relationships",
      priority: "high",
      columnId: "done",
      assignee: { name: "Taylor", avatar: "https://i.pravatar.cc/300?img=3" },
      dueDate: "2023-08-15",
    },
    {
      id: 4,
      title: "Implement frontend auth",
      description: "Create login and registration forms",
      priority: "medium",
      columnId: "todo",
      assignee: { name: "Jordan", avatar: "https://i.pravatar.cc/300?img=4" },
      dueDate: "2023-08-25",
    },
    {
      id: 5,
      title: "Write unit tests",
      description: "Create test cases for API endpoints",
      priority: "low",
      columnId: "backlog",
      assignee: { name: "Sam", avatar: "https://i.pravatar.cc/300?img=5" },
      dueDate: "2023-09-01",
    },
  ],
  dependencies: {
    1: [],
    2: [1, 3],
    3: [],
    4: [2],
    5: [2, 4],
  },
};

const taskBoardSlice = createSlice({
  name: "taskBoard",
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { taskId, columnId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.columnId = columnId;
      }
    },
    createCircularDependency: (state) => {
      state.dependencies[4] = [2];
      state.dependencies[2] = [4, 3];
    },
    fixCircularDependency: (state) => {
      state.dependencies[4] = [2];
      state.dependencies[2] = [1, 3];
    },
  },
});

export const { moveTask, createCircularDependency, fixCircularDependency } =
  taskBoardSlice.actions;
export default taskBoardSlice.reducer;
