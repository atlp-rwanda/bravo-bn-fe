import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "./jest.setup";
import store from "../redux/store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const getListResponse = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    username: "john doe",
    email: "tester@gmail.com",
  },
];

let mock = new MockAdapter(axios);

const mockNetworkResponse = () => {
  mock.onGet("/user/login").reply(200, getListResponse);
};

import Login from "../views/Login";

const user = {
  firstname: "Tresor",
  lastname: "Alain",
  email: "alaintresor@gmail.com",
  password: "Tresor123@",
  confirmPassword: "Tresor123@",
};

const loginUser = {
  email: "tresoralain351@gmail.com",
  password: "testing",
};

const wrongData = {
  shortPassword: "123",
  validEmail: "testing@gmail.com",
  wrongEmail: "wrongemail@gmail",
  errorEmail: "error@gmail.com",
};

test("Logins in the user after clicking login button", async () => {
  render(<Login />);
  expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
  expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: /log in to your account/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(
    screen.getByRole("img", {
      name: /barefoot logo/i,
    })
  ).toBeInTheDocument();

  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(screen.queryByText(/Please enter your email/i)).toBeInTheDocument();
  expect(screen.queryByText(/Please enter your password/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: wrongData.wrongEmail },
  });
  fireEvent.focusOut(screen.getByPlaceholderText("Email"));
  expect(screen.queryByText(/Please enter a valid email/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: loginUser.email },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(screen.queryByText(/Please enter your password/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: wrongData.shortPassword },
  });
  fireEvent.focusOut(screen.getByPlaceholderText("Password"));
  expect(
    screen.queryByText(/Password must be at least 6 characters long/i)
  ).toBeInTheDocument();

  await fireEvent.click(screen.queryByText(/sign up/i));
  expect(
    screen.queryByText(/sign up to create an account/i)
  ).not.toBeInTheDocument();
});
describe("Requests redux state tests", () => {
  it("Should initially set user to an empty string", () => {
    const state = store.getState().login;
    expect(state.user).toEqual("");
  });

  beforeAll(() => {
    mockNetworkResponse();
  });
  it("Should be able to fetch the user info", async () => {
    let trips;
    const res = await axios.get("/user/login");
    trips = res.data;

    const state = getListResponse;
    expect(trips[0]).toEqual(getListResponse[0]);
    expect(state).toEqual([trips[0]]);
  });
});
