import React from 'react';
import { render, cleanup, } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../redux/store";
import App from '../App.js';
import LoginForm from '../views/Login';
import Home from '../views/Home'
import Nav from '../components/NavDummy'
import About from '../views/About'
import Btn from '../components/Btn'

afterEach(cleanup);

test('renders App on non registered user',  () => {
  localStorage.removeItem("jwt");
  render(
    <Router>
      <Provider store={store}>
      <App />
      </Provider>
    </Router>,
  );
})

test('renders App on registered user',  () => {
  localStorage.setItem("jwt", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImlhdCI6MTY2MDI5MDQ1NCwiZXhwIjoxNjYwMzc2ODU0fQ.4aMwsxSnpIdiXrW5psghb1hHYGdiFIPFA1FiwL7sWh4`);
  render(
    <Router>
      <Provider store={store}>
      <App />    
      </Provider>
    </Router>,
  );
})

 test('renders react login page ',  () => {
   render(<Router>
    <Provider store={store}>
    <LoginForm />
    </Provider>
  </Router>); 


  expect(window.location.href).toBe("http://localhost/login");
}) 

test('renders react component', async () => {
  render(
     <Router>
      <Provider store={store}>
      <Home />    
      </Provider>
      </Router>
  );
})

test('renders react component', async () => {
  render(
     <Router>
      <Provider store={store}>

      <Nav />    
      </Provider>
      </Router>
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
 

