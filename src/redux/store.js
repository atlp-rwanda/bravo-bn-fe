import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import authSlice from "./auth/authSlice";
import loginReducer from "./auth/loginSlice";
import requestSlice from "./requests/requestSlice";
import tripsSlice from "./tripsSlice";

export const reducers = {
  auth: authSlice.reducer,
  alert: alertSlice.reducer,
  login: loginReducer,
  request: requestSlice,
  trips: tripsSlice.reducer,
}

 const store = configureStore({
  reducer: {
    ...reducers,
    devTools: process.env.NODE_ENV !== 'production',
  },
});

export default store;
