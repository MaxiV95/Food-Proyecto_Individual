import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import store from "./redux/store";

require('dotenv').config();

const URL_SERVER = process.env.URL_SERVER;
axios.defaults.baseURL = URL_SERVER;

ReactDOM.render(
  <Provider store={store}> {/* Estado global */}
    <React.StrictMode> {/* Encontrar y corregir problemas potenciales durante el desarrollo */}
      <BrowserRouter> {/* Funcionalidades de enrutamiento, aplicaciones de una sola página (SPA) */}
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
