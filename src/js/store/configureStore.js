import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import createLogger from "redux-logger";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  let middlewares = null;

  if (typeof window !== "undefined") {
    middlewares = applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      logger
    );

  } else {
    middlewares = applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    );
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
