import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import {
  Login,
  Landing
} from "./containers";


// TODO
import { Component } from "react";
class UserOnly extends Component {
  render() {
    return (
      <div>UserOnly</div>
    );
  }
}

function getAuthenticated(store) {
  const { auth: { authenticated } } = store.getState();
  return authenticated;
}

export default function getRoutes(store) {

  const userOnly = (nextState, replace, cb) => {
    if (!getAuthenticated(store)) {
      replace("/");
    }
    cb();
  };

  const guestOnly = (nextState, replace, cb) => {
    if (getAuthenticated(store)) {
      replace("/");
    }
    cb();
  };

  const routes = (
    <Route path="/">
      <IndexRoute component={Landing} />

      <Route onEnter={userOnly}>
        <Route path="/user" component={UserOnly}></Route>
      </Route>

      <Route onEnter={guestOnly}>
        <Route path="/login" component={Login} />
      </Route>
    </Route>
  );

  return routes;
}
