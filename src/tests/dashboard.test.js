import React from "react";
import "@testing-library/jest-dom";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Users from "../components/dashboard/Users";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UserDetailsModal from "../components/dashboard/UserDetailsModal";


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

  it("Should  set users loading to true ", () => {
    const state = store.getState();
    expect(state.users.loading).toEqual(true);
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
  it("Should initially set selectedUser to an empty string", () => {
    const state = store.getState().selectedUser;
    expect(state.data).toEqual("");
  });

  test("UserDetails should have email", () => {
    render(
      <Router>
        <Provider store={store}>
          <UserDetailsModal />
        </Provider>
      </Router>
    );
    const Email = screen.getByTestId("email");
    expect(Email).toBeInTheDocument();
  });

  test("UserDetails should have status", () => {
    render(
      <Router>
        <Provider store={store}>
          <UserDetailsModal />
        </Provider>
      </Router>
    );
    const verified = screen.getByTestId("Verified");
    expect(verified).toBeInTheDocument();
  });

  test("UserDetails should have username", () => {
    render(
      <Router>
        <Provider store={store}>
          <UserDetailsModal />
        </Provider>
      </Router>
    );
    const Username = screen.getByTestId("username");
    expect(Username).toBeInTheDocument();
  });
  test("UserDetails should have gender", () => {
    render(
      <Router>
        <Provider store={store}>
          <UserDetailsModal />
        </Provider>
      </Router>
    );
    const Gender= screen.getByTestId("gender");
    expect(Gender).toBeInTheDocument();
  });
  test("UserDetails should have Phone Number", () => {
    render(
      <Router>
        <Provider store={store}>
          <UserDetailsModal />
        </Provider>
      </Router>
    );
    const Phone= screen.getByTestId("phoneNumber");
    expect(Phone).toBeInTheDocument();
  });

  test("UserDetails sholud have save button", () => {
    render(
      <Router>
        <Provider store={store}>
          <UserDetailsModal />
        </Provider>
      </Router>
    );
    const save= screen.getByTestId("btn1");
    expect(save).toBeInTheDocument();

    });

});
