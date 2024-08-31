import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    sideBarOpen: false
  },
  reducers: {
    setSideBarOpen(state, { payload }) {
      state.sideBarOpen = payload;
    },
  },
});

export default appSlice.reducer;
export const { setSideBarOpen } = appSlice.actions;
