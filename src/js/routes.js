import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  SignInContainer,
  SignOutContainer,
  LandingContainer
} from "./containers";
import {
  AppContainer,
  BoardsContainer,
  BoardDetailContainer,
  SettingsContainer
} from "./containers/app/pages";
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
      <IndexRoute component={LandingContainer} />

      <Route onEnter={userOnly}>
        <Route path="/signout" component={SignOutContainer} />
        <Route path="/app/" component={AppContainer}>
          <Route path="settings" component={SettingsContainer} />
          <Route path="boards" component={BoardsContainer} />
          <Route path="board/:id" component={BoardDetailContainer} />
          <IndexRoute component={BoardsContainer} />
        </Route>
      </Route>

      <Route onEnter={guestOnly}>
        <Route path="/signin" component={SignInContainer} />
      </Route>
    </Route>
  );

  return routes;
}
