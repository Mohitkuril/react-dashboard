// src/redux/slices/resourceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    setResources: (state, action) => {
      state.resources = action.payload;
    },
    updateResourcePercentages: (state) => {
      state.resources = state.resources.map((r) => ({
        ...r,
        assignedPercentage: Math.min(
          100,
          Math.max(10, r.assignedPercentage + (Math.random() * 10 - 5))
        ),
        capacityPercentage: Math.min(
          100,
          Math.max(50, r.capacityPercentage + (Math.random() * 5 - 2))
        ),
      }));
    },
  },
});

export const { setResources, updateResourcePercentages } =
  resourceSlice.actions;
export default resourceSlice.reducer;
