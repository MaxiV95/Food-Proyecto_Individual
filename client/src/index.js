require('dotenv').config();
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import store from "../src/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const URL_SERVER = process.env.URL_SERVER || "http://localhost:3001";

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
reportWebVitals();
