import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSilce";
import loginReducer from "./auth/loginSlice";
import requestSlice from "./requests/requestSlice";
import selectedRequestSlice from "./requests/selectedRequestSlice";

export const reducers = {
  auth: authSlice.reducer,
  login: loginReducer,
  request: requestSlice,
  selectedRequest: selectedRequestSlice,
};

const store = configureStore({
  reducer: {
    ...reducers,
    devTools: process.env.NODE_ENV !== "production",
  },
});

export default store;
