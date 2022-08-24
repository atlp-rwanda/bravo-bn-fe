import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];
console.log(jwtToken);

export const requestSlice = createSlice({
  name: "request",
  initialState: {
    data: [],
  },
  reducers: {
    getRequests: (state, action) => {
      state.data = [action.payload];
    },
  },
});

export const getRequestAsync = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.API_URL}/user/trip/get`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    dispatch(getRequests(res.data.data));
  } catch (err) {
    console.log(err)
  }
};
export const searchRequestAsync = (searchTerm) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/search/${searchTerm}`,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    dispatch(getRequests(response.data.data.tripss.rows));
  } catch (err) {
    console.log(err)
  }
};

export const { getRequests, searchRequest } = requestSlice.actions;
export const showRequest = (state) => state.request.data;
export default requestSlice.reducer;
