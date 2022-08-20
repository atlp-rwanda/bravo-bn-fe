import { createSlice } from "@reduxjs/toolkit";

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: {
    data: "",
  },
  reducers: {
    selectUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { selectUser } = selectedUserSlice.actions;

export const showReq = (state) => state.selectedUser.data;
export default selectedUserSlice.reducer;