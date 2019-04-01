import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { combineSagas } from "./scripts/redux/sagas/helpers";
import sagas from "./scripts/redux/sagas";
import reducers from "./scripts/redux/reducers";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Store setup
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(combineSagas(sagas));

// Theme setup
const theme = createMuiTheme({
  typography: { useNextVariants: true },
  type: "dark"
});

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
