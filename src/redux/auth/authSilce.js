import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, token: null },
  reducers: {
    login: (state, action) => {
      const { isLoggedIn, token } = action.payload;

      state.isLoggedIn = isLoggedIn;
      state.token = token;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice;
