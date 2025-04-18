// src/store/teamSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamName: "",
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
    setTeamName: (state, action) => {
      state.teamName = action.payload;
    },
  },
});

export const { addTeamMember, setTeamMembers, setTeamName } = teamSlice.actions;
export default teamSlice.reducer;
