/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/app';
import { ActionTypes } from './actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

// this creates the store with the reducers, and does some other stuff to initialize devtools
const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: '#70D27E',
    },
  },
});

const token = localStorage.getItem('token');
if (token) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    store.dispatch({ type: ActionTypes.AUTH_USER, payload: user });
  }
}

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('main')
);
