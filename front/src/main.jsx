import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";

import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <MainRoutes />
    </Provider>
  </BrowserRouter>
);
