import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import {store} from "./redux/store";
import './styles/index.scss';


const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
  </Router>
);