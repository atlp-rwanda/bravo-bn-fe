import React from "react";
import "@testing-library/jest-dom";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TripDetails from "../components/dashboard/tripsRequest/TripDetails";
import { Provider, useDispatch } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import selectedRequestSlice, {
  selectRequest,
} from "../redux/requests/selectedRequestSlice";

const getListResponse = [
  {
    id: 1,
    leavingFrom: "kigali",
    travelReason: "launch",
    goingTo: "luanda",
    type: "round trip",
    status: "pending",
    accomodation: "marriot",
    travelDate: "2022-05-14",
    returnDate: "2022-05-14",
  },
];

let mock = new MockAdapter(axios);

const mockNetworkResponse = () => {
  mock.onGet("/user/trip/get").reply(200, getListResponse);
};

describe("Requests redux state tests", () => {
  it("Should initially set requests to an empty array", () => {
    const state = store.getState().request;
    expect(state.data).toEqual([]);
  });
  it("Should initially set selectedRequest to an empty string", () => {
    const state = store.getState().selectedRequest;
    expect(state.data).toEqual("");
  });
  it("Should initially set selectedRequest to an empty string", () => {
    store.dispatch(selectRequest(getListResponse[0]));
    const state = store.getState().selectedRequest;
    expect(state.data).toEqual(getListResponse[0]);
  });
  // it("Should initially set selectedRequest to an empty string", () => {
  //   store.dispatch(selectRequest(getListResponse[0]));
  //   const state = store.getState().selectedRequest;
  //   expect(state.data).toEqual(getListResponse[0]);
  // });

  beforeAll(() => {
    mockNetworkResponse();
  });
  it("Should be able to fetch the requests", async () => {
    let trips;
    const res = await axios.get("/user/trip/get");
    trips = res.data;

    const state = getListResponse;
    expect(trips[0]).toEqual(getListResponse[0]);
    expect(state).toEqual([trips[0]]);
  });
});
describe("Details popup", () => {
  beforeAll(() => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
  });
  test("TripDetails should have title", () => {
    const title = screen.getByText(/Trip Request Details/i);
    expect(title).toBeInTheDocument();
  });
  test("TripDetails should have Travel Reason", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const goingTo = screen.getByText(/Travel Reason:/i);
    expect(goingTo).toBeInTheDocument();
  });
  test("TripDetails should have Travel Type", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const type = screen.getByText(/Travel Type:/i);
    expect(type).toBeInTheDocument();
  });
  test("TripDetails should have status", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const status = screen.getByText(/Status:/i);
    expect(status).toBeInTheDocument();
  });
  test("TripDetails should have accomodation", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const accomodation = screen.getByText(/Accommodation:/i);
    expect(accomodation).toBeInTheDocument();
  });
  test("TripDetails should have travel date", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const travelDate = screen.getByText(/Travel Date:/i);
    expect(travelDate).toBeInTheDocument();
  });

  test("TripDetails should have requester", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const requester = screen.getByText(/Requester:/i);
    expect(requester).toBeInTheDocument();
  });
  test("TripDetails should have requester address", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const requesterAddress = screen.getByText(/Requester Address:/i);
    expect(requesterAddress).toBeInTheDocument();
  });
  test("TripDetails sholud have approve button", () => {
    render(
      <Router>
        <Provider store={store}>
          <TripDetails />
        </Provider>
      </Router>
    );
    const approve = screen.getByText(/Approve/i);
    expect(approve).toBeInTheDocument();
  }),
    test("TripDetails should have reject button", () => {
      render(
        <Router>
          <Provider store={store}>
            <TripDetails />
          </Provider>
        </Router>
      );
      const reject = screen.getByText(/Reject/i);
      expect(reject).toBeInTheDocument();
    });
});
