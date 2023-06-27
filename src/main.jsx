import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import popupReducer from "./State";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Create Redux store with popupReducer
const store = configureStore({
  reducer: { popup: popupReducer },
});

// Render App component within Redux Provider and StrictMode
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
