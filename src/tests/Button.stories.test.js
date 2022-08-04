import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import Meta, { Primary as PrimaryStory } from "../stories/Button.stories.jsx";
import { Email as EmailInput } from "../stories/Input.stories.jsx";

const Primary = composeStory(PrimaryStory, Meta);

test("onclick handler is called", () => {
  const onClickSpy = jest.fn();
  render(<Primary onClick={onClickSpy} />);
  const buttonElement = screen.getByRole("button");
  buttonElement.click();
  expect(onClickSpy).toHaveBeenCalled();
});

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
