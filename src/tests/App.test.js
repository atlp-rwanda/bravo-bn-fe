import React from 'react';
import ReactDom from 'react-dom';
import { render, fireEvent, cleanup } from "@testing-library/react";
import App from '../App.js';
import Login from '../views/Login'
import Home from '../views/Home'
import Nav from '../components/NavDummy'

afterEach(cleanup);

it('renders correctly', () => {
  const div = document.createElement('div');
  ReactDom.render(<App />, div);
  ReactDom.render(<Home />, div);
  ReactDom.render(<Login />, div);

});
