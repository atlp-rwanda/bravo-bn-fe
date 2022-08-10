import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, token: null },
  reducers: {
    login(state, action) {
      const {isLoggedIn, token} = action.payload;

      state.isLoggedIn = isLoggedIn;
      state.token = token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;