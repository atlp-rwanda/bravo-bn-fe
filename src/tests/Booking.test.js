import React from 'react';
import { render, cleanup, } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../redux/store";
import Booking from '../views/Book';

afterEach(cleanup);

test('renders App on non registered user',  () => {
  render(
    <Router>
      <Provider store={store}>
      <Booking />
      </Provider>
    </Router>,
  );
})

