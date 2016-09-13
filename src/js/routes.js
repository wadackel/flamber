import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  SignInPage,
  SignOutPage,
  LandingPage
} from "./containers/pages";
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


const isAuthenticated = store => {
  const { auth } = store.getState();
  return !!auth.user || auth.hasJwtToken;
};


export default function getRoutes(store) {

  const userOnly = (nextState, replace, done) => {
    if (!isAuthenticated(store)) replace("/");
    done();
  };

  const guestOnly = (nextState, replace, done) => {
    if (isAuthenticated(store)) replace("/");
    done();
  };

  const routes = (
    <Route path="/" component={ThemeProvider}>
      <IndexRoute component={LandingPage} />

      <Route onEnter={userOnly}>
        <Route path="/signout" component={SignOutPage} />
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
        <Route path="/signin" component={SignInPage} />
      </Route>
    </Route>
  );

  return routes;
}
