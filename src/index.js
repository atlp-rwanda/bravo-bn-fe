import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import { store } from "./redux/store";
import { Provider } from "react-redux";


const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

