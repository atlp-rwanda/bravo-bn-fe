import React from "react";
import {Input, Select as SelectOption} from "../components/Input";

export default {
  title: "Form/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;
const selectTemplate = (args) => <SelectOption {...args} />;
const options=[{name:"gender",value:'select'},{name:"Male",value:'male'},{name:"Female",value:'female'}]
 

export const Text = Template.bind({});
Text.args = {
  inputFor:"firstname",
  parentClass:"form-group",
  childClass:"input-group ",
  placeholder:"First name",
  type:"text",
  icon:"person",
  errorType:'firstname-error',
  errorClass:"error",
};

export const Email = Template.bind({});
Email.args = {
  inputFor:"email",
  parentClass:"form-group ",
  childClass:"input-group ",
  placeholder:"Email",
  type:"email",
  icon:"at-circle-outline",
  errorType:'email-error',
  errorClass:"error",
};

export const Number = Template.bind({});
Number.args = {
  inputFor:"phonenumber",
  parentClass:"form-group",
  childClass:"input-group ",
  placeholder:"Phone number",
  type:"number" ,
  icon:"call",
  errorType:'phonenumber-error',
  errorClass:"error"
};

export const Password = Template.bind({});
Password.args = {
  inputFor:"password",
  parentClass:"form-group",
  childClass:"input-group ",
  placeholder:"Password",
  type:"password",
  icon:"lock-closed-outline",
  errorType:'password-error',
  errorClass:"error"
};

export const Select = selectTemplate.bind({});
Select.args = {
  inputFor:"gender",
  parentClass:"form-group input-left",
  childClass:"input-group input-resize",
  name:"gender" ,
  icon:"call",
  errorType:'gender-error',
  errorClass:"error",
  options
};

export const Submit = Template.bind({});
Submit.args = {
  parentClass:"form-group input-align",
  childClass: "input-group  button",
  type:"submit",
  value:"Create account"
};
