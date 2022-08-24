// Inside src/stories/2-Header.stories.js

import React from 'react';

import Input from '../components/Input/Input.js';

export default {
  title: 'Input',
  component: Input,
};
const Template = (args) => <Input {...args} />
export const Default = Template.bind({});
export const Email = Template.bind({});
Email.args = {
  type: 'text',
  placeholder: 'Email'
};
export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: "Password",

};
export const conf_password = Template.bind({});
conf_password.args = {
  type: 'password',
  placeholder: "Confirm Password",
};
