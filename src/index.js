import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// Provider gives the app access to the store and the reducers so that the app can dispatch actions to the store and
// pull values from the store to be used by the components
import { Provider } from "react-redux";
// PersistGate is the persistor that stores the state on the local storage according to the config in root-reducer and store
import { PersistGate } from "redux-persist/integration/react";
// persistor is the persisting version of the store
import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
