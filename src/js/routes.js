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

export default function getRoutes(store) {
  const requireAuth = (nextState, replace, cb) => {
    const { auth: { authenticated } } = store.getState();
    if (!authenticated) {
      replace("/");
    }
    cb();
  };

  const routes = (
    <Route path="/">
      <IndexRoute component={Landing} />

      <Route onEnter={requireAuth}>
        <Route path="/user" component={UserOnly}></Route>
      </Route>

      <Route path="/login" component={Login} />
    </Route>
  );

  return routes;
}
