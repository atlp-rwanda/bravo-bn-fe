import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSilce";
import loginReducer from "./auth/loginSlice";
import userSlice from "./users/userSlice";
import selectedUserSlice from "./users/selectedUserSlice";
import requestSlice from "./requests/requestSlice";

export const reducers = {
  auth: authSlice.reducer,
  login: loginReducer,
  users: userSlice,
  selectedUser:selectedUserSlice,
  request: requestSlice

}

 const store = configureStore({
  reducer: {
    ...reducers,
    devTools: process.env.NODE_ENV !== 'production',
  },
});

export default store;
