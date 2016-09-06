import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  SignInContainer,
  SignOutContainer,
  LandingContainer
} from "./containers";
import {
  AllItemsPage,
  AppPage,
  BoardsPage,
  BoardDetailPage,
  SettingsPage,
  StarsPage,
  TagsPage
} from "./containers/app/pages";
import ThemeProvider from "./components/ThemeProvider";

function getAuthenticated(store) {
  return store.getState().auth.authenticated;
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
        <Route path="/app/" component={AppPage}>
          <Route path="settings" component={SettingsPage} />
          <Route path="items" component={AllItemsPage} />
          <Route path="boards" component={BoardsPage} />
          <Route path="board/:id" component={BoardDetailPage} />
          <Route path="stars" component={StarsPage} />
          <Route path="tag/:id" component={TagsPage} />
          <IndexRoute component={BoardsPage} />
        </Route>
      </Route>

      <Route onEnter={guestOnly}>
        <Route path="/signin" component={SignInContainer} />
      </Route>
    </Route>
  );

  return routes;
}
