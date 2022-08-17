import React from "react";
import { action } from "@storybook/addon-actions";
import Input from "../components/Input";

export default {
  title: "Form/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Email = Template.bind({});
Email.args = {
  className: "input-group",
  type: "email",
  icon: "at-circle-outline",
  placeholder: "Email",
};

export const Password = Template.bind({});
Password.args = {
  className: "input-group",
  type: "text",
  icon: "lock-closed-outline",
  placeholder: "Password",
};

export const Submit = Template.bind({});
Submit.args = {
  className: "input-group button",
  type: "submit",
  value: "Login",
};
