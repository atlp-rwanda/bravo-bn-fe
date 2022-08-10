import React from 'react';
import { render, cleanup } from "./jest.setup";
import { BrowserRouter as Router } from 'react-router-dom';
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
      <App />    
  );
})
test('renders react component', async () => {
  render(
      <Home />    
  );
})
test('renders react component', async () => {
  render(
      <Login />    
  );
})
test('renders react component', async () => {
  render(
      <Nav />    
  );
})
test('renders react component', async () => {
  render(
      <SignUp />    
  );
})
test('renders react component', async () => {
  render(
      <About />    
  );
})
test('renders react component', async () => {
  render(
      <Btn />    
  );
})