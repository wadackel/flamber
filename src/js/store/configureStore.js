import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import createLogger from "redux-logger";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        logger
      )
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
