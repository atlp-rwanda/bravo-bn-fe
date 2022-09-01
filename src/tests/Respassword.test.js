import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "./jest.setup";
import userEvent from "@testing-library/user-event";

import Respassword from "../views/Respassword";

describe("<Respassword />", () => {
  test("shows proper span when rendered", () => {
    render(<Respassword />);
    const span = screen.getByText("Nomad");
    expect(span).toBeInTheDocument();
  });

  test("render password input", () => {
    render(<Respassword />);

    const inputEl = screen.getByPlaceholderText("Password");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
    expect(inputEl).toHaveAttribute("name", "password");
    expect(inputEl).toHaveAttribute("placeholder", "Password");
  });
  test("render confirm password input", () => {
    render(<Respassword />);

    const inputEl = screen.getByPlaceholderText("Confirm Password");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "password");
    expect(inputEl).toHaveAttribute("name", "conf_password");
    expect(inputEl).toHaveAttribute("placeholder", "Confirm Password");
  });

  test("pass password in input field", () => {
    render(<Respassword />);

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "doitor" },
    });
    expect(screen.getByPlaceholderText("Password")).toHaveValue("doitor");
  });
  test("pass  confirm password in input field", () => {
    render(<Respassword />);

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "doitor" },
    });
    expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
      "doitor"
    );
  });
  test("shows proper heading when rendered", () => {
    render(<Respassword />);
    const paragraph = screen.getByText("Reset Password");
    expect(paragraph).toBeInTheDocument();
  });
  test("save password  on click", async () => {
    render(<Respassword />);
    const button = screen.getByRole("button");
    await fireEvent.click(button);
    expect(button).toHaveTextContent("Save New Password");
  });

  test("Test reset password inputs", async () => {
    render(<Respassword />);

    expect(screen.getByText(/Save New Password/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Save New Password/i }));
    expect(screen.queryByText(/password is required/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "jiojdfgioj" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save New Password/i }));
    expect(
      screen.queryByText(/confirmation password is required/i)
    ).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "uhiu" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save New Password/i }));
    expect(screen.queryByText(/password not match/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "jiojdfgioj" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save New Password/i }));
  });
});
