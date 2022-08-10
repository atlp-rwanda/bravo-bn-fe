import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import authSlice from "./auth/authSilce";
import loginReducer from "./auth/loginSlice";

export const reducers = {
  counter: counterReducer,
  auth: authSlice.reducer,
  login: loginReducer,
}

export const store = configureStore({
  reducer: {
    ...reducers,
    devTools: process.env.NODE_ENV !== 'production'
  }});
