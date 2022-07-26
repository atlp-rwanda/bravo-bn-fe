/* eslint-disable */
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "./jest.setup";

import Signup from "../views/Signup";

const wrongData = {
  shortPassword: "123",
  validEmail: "testing@gmail.com",
  wrongEmail: "wrongemail@gmail",
  errorEmail: "error@gmail.com",
};

test("Signup a user after clicking creat account button button", async () => {
  const { getByTestId, getAllByTestId } = render(<Signup />);

  expect(screen.getByText(/Create account/i)).toBeInTheDocument();
  expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));
  expect(
    screen.queryByText(/Phone number must have 10 digits/i)
  ).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText("Phone number"), {
    target: { value: "1234567890" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));
  expect(
    screen.queryByText(/use characters less than or equal to 8 long/i)
  ).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "azertyui" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));
  expect(
    screen.queryByText(/Your passwords does not match/i)
  ).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText("Repeat password"), {
    target: { value: "azertyui" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));

  expect(
    screen.queryByText(/Phone number must have 10 digits./i)
  ).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Phone number"), {
    target: { value: "1234567890" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));

  expect(screen.queryByText(/Please enter a valid email/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: wrongData.validEmail },
  });
  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));
  expect(screen.queryByText(/Please enter username./i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "ken" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));
  expect(screen.queryByText(/Please enter first name/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("First name"), {
    target: { value: "ken" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Create account/i }));
  expect(screen.queryByText(/Please enter last name/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Last name"), {
    target: { value: "ken" },
  });

  fireEvent.change(getByTestId("select"), { target: { value: "male" } });
  let options = getAllByTestId("select-option");
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});
