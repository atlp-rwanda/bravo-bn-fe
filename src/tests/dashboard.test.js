import React from "react";
import "@testing-library/jest-dom";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Users from "../components/dashboard/Users";
import { Provider } from "react-redux";
import store from "../redux/store";
import { getUsersAsync } from "../redux/users/userSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";


const getListResponse = [
  {
    "id": 2,
    "firstName": "John",
    "lastName": "Doe",
    "username": "jdoe",
    "email": "mydrivefilestorage@gmail.com",
    "phoneNumber": "0788800012",
    "image": null,
    "socialMediaId": null,
    "provider": null,
    "isVerified": true,
    "gender": "male",
    "preferredLanguage": null,
    "preferredCurrency": null,
    "department": null,
    "lineManager": null,
    "birthDate": null,
    "verificationToken": null,
    "role": "manager",
    "remember_info": false
  },
]

let mock = new MockAdapter(axios);

const mockNetworkResponse = () => {
  mock.onGet("/user/get").reply(200, getListResponse);
}

describe("users table", () => {
  beforeAll(() => {
    render(
      <Router>
        <Provider store={store}>
          <Users />
        </Provider>
      </Router>
    );
  });
  test("  UsersTable should have table", () => {
    const table = screen.getByTestId("Users-table");
    expect(table).toBeInTheDocument();
  });

  test("  UsersTable should have column headers", () => {
    const { container } = render(
      <Provider store={store}>
        <Users />
      </Provider>
    );
    const table = container.querySelector(".MuiDataGrid-columnHeader");
    expect(table).toBeInTheDocument();
  });

  test("  UsersTable should have page change button", () => {
    const { container } = render(
      <Provider store={store}>
        <Users />
      </Provider>
    );
    const pageButton = container.querySelector(".MuiButtonBase-root");
    expect(pageButton).toBeInTheDocument();
  });

  test("  UsersTable should have table body", () => {
    const { container } = render(
      <Provider store={store}>
        <Users />
      </Provider>
    );
    const tableBody = container.querySelector(".MuiDataGrid-main");
    expect(tableBody).toBeInTheDocument();
  });

  test("  UsersTable should have table row body", () => {
    const { container } = render(
      <Provider store={store}>
        <Users />
      </Provider>
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    expect(rowBody).toBeInTheDocument();
  });

  test("  UsersTable should have text message in table row if no data", () => {
    const { container } = render(
      <Provider store={store}>
        <Users />
      </Provider>
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    const text = "No rows";
    expect(rowBody).toHaveTextContent(text);
  });
  afterEach(cleanup);
});

describe("users redux state tests", () => {
  it("Should initially set users to an empty array", () => {
    const state = store.getState();
    expect(state.users.users).toEqual([]);
  });

  beforeAll(() => {
    mockNetworkResponse()
  })
  it('Should be able to fetch users', async () => {
    let user;
    const res = await axios.get("/user/get")
    user= res.data;

    const state = getListResponse
    expect(user[0]).toEqual(getListResponse[0])
    expect(state).toEqual([ user[0] ] )
  })
});