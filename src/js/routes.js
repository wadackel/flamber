import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import {
  App,
  Landing
} from "./containers";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
  </Route>
);

export default routes;
