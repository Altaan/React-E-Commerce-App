import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
// import thunk from "redux-thunk"; // this middleware used to dispatch functions inside an action creator
import createSagaMiddleware from "redux-saga"; // the saga middleware is to used run sagas concurrently to not block execution

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

// persistor is a persisting version of the store. The provider that wraps the app in index.js will use this persistor
export const persistor = persistStore(store);
