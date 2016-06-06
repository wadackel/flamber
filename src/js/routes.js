import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  SignIn,
  SignOut,
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

  function userOnly(nextState, replace, cb) {
    if (!getAuthenticated(store)) {
      replace("/");
    }
    cb();
  }

  function guestOnly(nextState, replace, cb) {
    if (getAuthenticated(store)) {
      replace("/");
    }
    cb();
  }

  const routes = (
    <Route path="/">
      <IndexRoute component={Landing} />

      <Route onEnter={userOnly}>
        <Route path="/signout" component={SignOut} />
        <Route path="/user" component={UserOnly}></Route>
      </Route>

      <Route onEnter={guestOnly}>
        <Route path="/signin" component={SignIn} />
      </Route>
    </Route>
  );

  return routes;
}
