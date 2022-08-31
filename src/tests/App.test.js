import React from 'react';
import { render, cleanup, } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../redux/store";
import App from '../App.js';
import About from '../views/About'
import Btn from '../components/Btn'

afterEach(cleanup);

test('renders App on  registered user', () => {
  document.cookie = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY2MTMzNjM2OSwiZXhwIjoxNjYxNDIyNzY5fQ.RGMvNjJQsWDStzDEmdFDCFJDyYnX6VDjhkCGAp1UCqI'
  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  );
})

test('renders react component', async () => {
  render(
    <Router>
      <Provider store={store}>

        <About />
      </Provider>
    </Router>
  );
})
test('renders react component', async () => {
  render(
    <Router>
      <Provider store={store}>

        <Btn />
      </Provider>
    </Router>
  );
})
