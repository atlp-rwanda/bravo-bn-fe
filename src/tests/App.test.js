import React from 'react';
import { render, cleanup, } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../redux/store";
import App from '../App.js';
import About from '../views/About'
import Btn from '../components/Btn'

const user = {
  "id": 16,
  "firstName": "Alain",
  "lastName": "Tresor",
  "username": "Alain",
  "email": "tresoralain35@gmail.com",
  "phoneNumber": "0780591269",
  "image": null,
  "socialMediaId": null,
  "provider": null,
  "isVerified": true,
  "gender": "male",
  "preferredLanguage": null,
  "preferredCurrency": null,
  "department": null,
  "lineManager": null,
  "birthDate": null,
  "verificationToken": null,
  "role": "requester",
  "remember_info": false
}
afterEach(cleanup);

test("renders App on non registered user", () => {
  localStorage.removeItem("jwt");
  localStorage.setItem('user', JSON.stringify(user))
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