import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import authSlice from "./auth/authSlice";
import loginReducer from "./auth/loginSlice";
import requestSlice from "./requests/requestSlice";
import tripsSlice from "./tripsSlice";
import userSlice from "./users/userSlice";
import selectedUserSlice from "./users/selectedUserSlice"

export const reducers = {
  auth: authSlice.reducer,
  alert: alertSlice.reducer,
  login: loginReducer,
  request: requestSlice,
  trips: tripsSlice.reducer,
  users:userSlice,
  selectedUser:selectedUserSlice,

}

 const store = configureStore({
  reducer: {
    ...reducers,
    devTools: process.env.NODE_ENV !== 'production',
  },
});

export default store;
