import "babel-polyfill";

import dotenv from "dotenv";
dotenv.config();

import path from "path";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { match, RouterContext, createMemoryHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Helmet from "react-helmet";
import configureStore from "./store/configureStore";
import errorJSONMiddleware from "./middleware/error-json";
import authMiddleware from "./middleware/auth";
import setUpMiddleware from "./middleware/setup-data";
import authRoutes from "./routes/auth";
import apiRoutes from "./routes/api";
import getRoutes from "./routes";
import { initialState as authInitialState } from "./reducers/auth";

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect("mongodb://localhost/dripup");


// Layout
/* eslint-disable react/no-danger, react/prop-types */
function HTML({ content, store }) {
  const head = Helmet.rewind();
  const attrs = head.htmlAttributes.toComponent();

  return (
    <html {...attrs}>
      <head>
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.title.toComponent()}
        {head.style.toComponent()}
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <div id="app" className="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script id="initial-state" type="text/plain" data-json={JSON.stringify(store.getState())}></script>
        <script src="/js/client.bundle.js"></script>
      </body>
    </html>
  );
}
/* eslint-enable react/no-danger, react/prop-types */


// Express middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(express.static(path.resolve(__dirname, "../../public")));

app.use(errorJSONMiddleware);
app.use(authMiddleware);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use(setUpMiddleware);


// Basic routes
app.use((req, res) => {
  const initialState = {
    auth: Object.assign({}, authInitialState, {
      authenticated: req.authenticated,
      authenticateURL: req.authenticateURL,
      user: req.user
    }),
    settings: req.settings
  };

  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory, initialState);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.status(200).send(`<!doctype html>\n${renderToString(<HTML content={content} store={store} />)}`);

    } else {
      res.status(404).send("404 Not found");
    }
  });
});


// Listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
