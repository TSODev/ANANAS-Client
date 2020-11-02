/*!

=========================================================
* Material Kit PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { PersistGate } from "redux-persist/integration/react";

import { CookiesProvider } from "react-cookie";
import genericReducer from "./MainStore/reducers/reducer";
import authReducer from "./MainStore/reducers/Auth";
import errorReducer from "./MainStore/reducers/Error";
import peopleReducer from "./MainStore/reducers/People";
import HRA_absReducer from "./MainStore/reducers/HRA_Absences";
import LN_absReducer from "./MainStore/reducers/LN_Absences";
import anomaliesReducer from "./MainStore/reducers/Anomalies";
//import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { frFR } from "@material-ui/core/locale";

import "assets/scss/material-kit-pro-react.scss?v=1.9.0";

import App from "./App";

const theme = createMuiTheme({
  palette: {
    //    primary: { main: "#1976d2" },
    common: {
      black: "#000",
      white: "#fff",
      type: "light",
    },
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
  },

  frFR,
});

const rootReducer = combineReducers({
  generic: genericReducer,
  auth: authReducer,
  error: errorReducer,
  people: peopleReducer,
  HRA_absence: HRA_absReducer,
  LN_absence: LN_absReducer,
  anomalies: anomaliesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["generic", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

let persistor = persistStore(store);

//var hist = createBrowserHistory();

const app = (
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
