import "babel-polyfill";
import es6Promise from "es6-promise";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./store/configureStore";
import getRoutes from "./routes";

es6Promise.polyfill();

const jsonString = document.getElementById("initial-state").getAttribute("data-json");
const store = configureStore(browserHistory, JSON.parse(jsonString));
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV !== "production") {
  // const { whyDidYouUpdate } = require("why-did-you-update");
  // whyDidYouUpdate(React);
  //
  // window.Perf = require("react-addons-perf");
}

render(
  <Provider store={store}>
    <Router history={history} routes={getRoutes(store)} />
  </Provider>,
  document.getElementById("app")
);
