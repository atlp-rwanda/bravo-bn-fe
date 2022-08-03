import React from 'react';
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import App from '../App.js';
import Home from '../views/Home'
import Login from '../views/Login'
import Nav from '../components/NavDummy'
import SignUp from '../views/Signup.js';
import About from '../views/About'
import Btn from '../components/Btn'
afterEach(cleanup);
test('renders react component', async () => {
  render(
    <Router>

      <Provider store={store}>
        {" "}
        <App />
      </Provider>

      <Home />
      <Login />
      <About />
      <SignUp />
      <Nav />
      <Btn />
    </Router>,
  );
})

