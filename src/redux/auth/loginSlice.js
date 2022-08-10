import { createSlice } from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
  name: 'user',
  initialState: {
    value: '',
  },
  reducers: {
    logginUser: (state, user) => ({
      user,
    }),
  },
});

export const { logginUser } = LoginSlice.actions;
export const thisUser = (state) => state.login;

export default LoginSlice.reducer;
