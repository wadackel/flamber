import "babel-polyfill";

import dotenv from "dotenv";
dotenv.config();

import path from "path";
import mongoose from "mongoose";
import imgur from "imgur";
import express from "express";
import favicon from "serve-favicon";
import compression from "compression";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import React from "react";
import cookie from "react-cookie";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { match, RouterContext, createMemoryHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Helmet from "react-helmet";
import passport from "./passport";
import configureStore from "./store/configure-store";
import errorJSONMiddleware from "./middleware/error-json";
import authMiddleware from "./middleware/auth";
import authRoutes from "./routes/auth";
import apiRoutes from "./routes/api";
import getRoutes from "./routes";

const PORT = process.env.PORT || 3000;
const app = express();


// Mongoose
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/flamber");


// Imgur
imgur.setClientId(process.env.IMGUR_CLIENT_ID);


// Layout
/* eslint-disable react/no-danger, react/prop-types */
const HTML = ({ content, store }) => {
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
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <div id="app" className="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script id="initial-state" type="text/plain" data-json={JSON.stringify(store.getState())}></script>
        <script src="/js/client.bundle.js"></script>
      </body>
    </html>
  );
};
/* eslint-enable react/no-danger, react/prop-types */


// Express middleware
app.use(compression());
app.use(favicon(path.resolve(__dirname, "../public/favicon.ico")));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(passport.initialize());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use((req, res, next) => {
  cookie.plugToRequest(req, res);
  next();
});


app.use(errorJSONMiddleware);
app.use(authMiddleware);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);


// Basic routes
app.use((req, res) => {
  const initialState = {
    auth: {
      authenticated: false,
      hasJwtToken: req.hasJwtToken
    }
  };

  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory, initialState);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    let props = renderProps;

    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return;

    } else if (error) {
      res.status(500);

    } else if (!renderProps) {
      props = {};
      res.status(404);

    } else {
      res.status(200);
    }

    const content = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    );

    res.send(`<!doctype html>\n${renderToString(<HTML content={content} store={store} />)}`);
  });
});


// Listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
