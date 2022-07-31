import React from 'react';
import ReactDom from 'react-dom';
import { render, fireEvent, cleanup } from "@testing-library/react";
import App from '../App.js';

afterEach(cleanup);

it('renders correctly', () => {
  const div = document.createElement('div');
  ReactDom.render(<App />, div);
});
