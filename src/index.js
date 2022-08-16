import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from "./redux/store";
import './styles/index.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const THEME = createTheme({
  typography: {
   "fontFamily": `Montserrat`
  }
});

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={THEME}>

  <Router>
    <Provider store={store}>
    <App />
    </Provider>
  </Router>
  </ThemeProvider>
);