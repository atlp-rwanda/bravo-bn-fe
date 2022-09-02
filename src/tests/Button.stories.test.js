import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Email as EmailInput } from "../stories/Input.stories";


test("render email input", () => {
  render(
    <EmailInput
      className="input-group"
      type="email"
      icon="at-circle-outline"
      placeholder="Email"
    />
  );

  const inputEl = screen.getByPlaceholderText("Email");
  expect(inputEl).toBeInTheDocument();
  expect(inputEl).toHaveAttribute("type", "email");
});