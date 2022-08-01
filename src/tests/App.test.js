import React from 'react';
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App.js';
import Home from '../views/Home'
import Login from '../views/Login'
import Nav from '../components/NavDummy'

afterEach(cleanup);
test('renders react component', async () => {
  render(
    <Router>
      <App />
      <Home />
      <Login />
      <Nav />
    </Router>,
  );
})

