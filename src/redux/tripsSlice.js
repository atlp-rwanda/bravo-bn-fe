import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
  name: "trips",
  initialState: {trips:null,tripRequest:null,comments:null },
  reducers: {
    getTripRequests(state, action) {
      const {trips} = action.payload;
      state.trips = trips;
    },
    updateTripRequests(state, action) {
      const {index,property,value} = action.payload;
      state.trips[index] ? state.trips[index][`${property}`] = value: state.trips[index]={
        [`${property}`] : value
      }
    },
    openTripRequest(state, action) {
      const {value} = action.payload;
      state.tripRequest = value;
    },
    comments(state, action) {
      const {comments} = action.payload;
      state.comments = comments;
    },
  },
});

export const tripsActions = tripsSlice.actions;

export default tripsSlice;
