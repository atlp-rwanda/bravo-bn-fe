import React from "react";
import "@testing-library/jest-dom";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TripRequests from "../components/dashboard/tripsRequest/TripRequests";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import renderer from "react-test-renderer";
import { getRequests } from "../redux/requests/requestSlice";

const getListResponse = [
  {
    id: 43,
    leavingFrom: "kigali",
    goingTo: 1,
    travelDate: "Wed Jun 29 2022 04:44:15 GMT+0200 (Central Africa Time)",
    returnDate: "Fri Jul 1 2022 04:44:15 GMT+0200 (Central Africa Time)",
    travelReason: "marketing",
    tripType: "Round trip",
    status: "rejected",
    passportName: "John Doe",
    passportNumber: "123XYZ4",
    requesterId: 16,
    roomId: 8,
    accomodation: {
      id: 1,
      name: "Marriot",
      description: "Five star hotel in Rwanda",
      locationId: 1,
      image:
        "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80",
      geoLocation: "-19.123.448",
      highlight: "Wooow",
      amenitiesList: ["hot water", "swim swim", "parking"],
    },
  },
];

let mock = new MockAdapter(axios);

const mockNetworkResponse = () => {
  mock.onGet("/user/trip/get").reply(200, getListResponse);
};
describe("snapshots", () => {
  const element = renderer
    .create(
      <Router>
        <Provider store={store}>
          <TripRequests />
        </Provider>
      </Router>
    )
    .toJSON();
  expect(element).toMatchSnapshot();
});

describe("Requests redux state tests", () => {
  it("Should initially set requests to an empty array", () => {
    const state = store.getState().request;
    expect(state.data).toEqual([]);
  });
  it("Should initially set selectedRequest to an empty string", () => {
    store.dispatch(getRequests(getListResponse[0]));
    const state = store.getState().request;
    expect(state.data).toEqual(getListResponse);
  });
  it("Should open popup", () => {
    // expect(screen.getByText(/marriot/i)).toBeInTheDocument();
  });

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

describe("requests table", () => {
  beforeAll(() => {
    render(
      <Router>
        <Provider store={store}>
          <TripRequests />
        </Provider>
      </Router>
    );
  });

  test("TripRequests should have table", () => {
    const table = screen.getByTestId("requests-table");
    expect(table).toBeInTheDocument();
  });

  test("TripRequests should have column headers", () => {
    const { container } = render(
      <Provider store={store}>
        <TripRequests />
      </Provider>
    );
    const table = container.querySelector(".MuiDataGrid-columnHeader");
    expect(table).toBeInTheDocument();
  });

  test("TripRequests should have requester address column in headers", async () => {
    const { container } = render(
      <Provider store={store}>
        <TripRequests />
      </Provider>
    );
    expect(screen.getByText(/requester address/i)).toBeInTheDocument();
  });

  test("TripRequests should have travel reason column in headers", () => {
    const { container } = render(
      <Provider store={store}>
        <TripRequests />
      </Provider>
    );
    expect(screen.getByText(/travel reason/i)).toBeInTheDocument();
  });

  test("TripRequests should have page change button", () => {
    const { container } = render(
      <Provider store={store}>
        <TripRequests />
      </Provider>
    );
    const pageButton = container.querySelector(".MuiButtonBase-root");
    expect(pageButton).toBeInTheDocument();
  });

  test("TripRequests should have table body", () => {
    const { container } = render(
      <Provider store={store}>
        <TripRequests />
      </Provider>
    );
    const tableBody = container.querySelector(".MuiDataGrid-main");
    expect(tableBody).toBeInTheDocument();
  });

  test("TripRequests should have table row body", () => {
    const { container } = render(
      <Provider store={store}>
        <TripRequests />
      </Provider>
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    expect(rowBody).toBeInTheDocument();
  });

  test("TripRequests should have text message in table row if no data", () => {
    const { container } = render(
      <Provider store={store}>
        <TripRequests />
      </Provider>
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    const text = "No rows";
    expect(rowBody).toHaveTextContent(text);
  });
  afterEach(cleanup);
});

