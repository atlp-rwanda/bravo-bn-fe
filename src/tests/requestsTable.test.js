import React from "react";
import "@testing-library/jest-dom";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RequestsTable from "../components/dashboard/RequestsTable";
import { Provider } from "react-redux";
import store from "../redux/store";
import getRequestAsync from "../redux/requests/requestSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
  }
]

let mock = new MockAdapter(axios);

const mockNetworkResponse = () => {
  mock.onGet("/user/trip/get").reply(200, getListResponse);
}

describe("requests table", () => {
  beforeAll(() => {
    render(
      <Router>
        <Provider store={store}>
          <RequestsTable />
        </Provider>
      </Router>
    );
  });
  test("RequestsTable should have table", () => {
    const table = screen.getByTestId("requests-table");
    expect(table).toBeInTheDocument();
  });

  test("RequestsTable should have column headers", () => {
    const { container } = render(
      <Provider store={store}>
        <RequestsTable />
      </Provider>
    );
    const table = container.querySelector(".MuiDataGrid-columnHeader");
    expect(table).toBeInTheDocument();
  });

  test("RequestsTable should have page change button", () => {
    const { container } = render(
      <Provider store={store}>
        <RequestsTable />
      </Provider>
    );
    const pageButton = container.querySelector(".MuiButtonBase-root");
    expect(pageButton).toBeInTheDocument();
  });

  test("RequestsTable should have table body", () => {
    const { container } = render(
      <Provider store={store}>
        <RequestsTable />
      </Provider>
    );
    const tableBody = container.querySelector(".MuiDataGrid-main");
    expect(tableBody).toBeInTheDocument();
  });

  test("RequestsTable should have table row body", () => {
    const { container } = render(
      <Provider store={store}>
        <RequestsTable />
      </Provider>
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    expect(rowBody).toBeInTheDocument();
  });

  test("RequestsTable should have text message in table row if no data", () => {
    const { container } = render(
      <Provider store={store}>
        <RequestsTable />
      </Provider>
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    const text = "No rows";
    expect(rowBody).toHaveTextContent(text);
  });
  afterEach(cleanup);
});

describe("Requests redux state tests", () => {
  it("Should initially set requests to an empty array", () => {
    const state = store.getState().request;
    expect(state.data).toEqual([]);
  });

  beforeAll(() => {
    mockNetworkResponse()
  })
  it('Should be able to fetch the requests', async () => {
    let trips;
    const res = await axios.get("/user/trip/get")
    trips = res.data;

    const state = getListResponse
    expect(trips[0]).toEqual(getListResponse[0])
    expect(state).toEqual([ trips[0] ] )
  })
});
