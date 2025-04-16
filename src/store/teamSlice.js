// src/store/teamSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamMembers: [], // Store the team members' data
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeamMember: (state, action) => {
      state.teamMembers.push(action.payload);
    },
    setTeamMembers: (state, action) => {
      state.teamMembers = action.payload;
    },
  },
});

export const { addTeamMember, setTeamMembers } = teamSlice.actions;
export default teamSlice.reducer;
