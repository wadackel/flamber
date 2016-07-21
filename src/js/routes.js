import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  SignIn,
  SignOut,
  Landing
} from "./containers";
import {
  App,
  Boards,
  BoardDetail,
  Settings
} from "./containers/app/";
import ThemeProvider from "./components/ThemeProvider";

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
    <Route path="/" component={ThemeProvider}>
      <IndexRoute component={Landing} />

      <Route onEnter={userOnly}>
        <Route path="/signout" component={SignOut} />
        <Route path="/app/" component={App}>
          <Route path="settings" component={Settings} />
          <Route path="boards" component={Boards} />
          <Route path="board/:id" component={BoardDetail} />
          <IndexRoute component={Boards} />
        </Route>
      </Route>

      <Route onEnter={guestOnly}>
        <Route path="/signin" component={SignIn} />
      </Route>
    </Route>
  );

  return routes;
}
