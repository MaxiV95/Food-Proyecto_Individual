import React from "react";
import { createRoot } from "react-dom/client"; // para "react v18"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import store from "./redux/store";

require('dotenv').config();
axios.defaults.baseURL = process.env.REACT_APP_URL_SERVER;

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>{/* Encontrar y corregir problemas potenciales durante el desarrollo */}
    <Provider store={store}>{/* Estado global */}
      <BrowserRouter>{/* Funcionalidades de enrutamiento, aplicaciones de una sola página (SPA) */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
