import React from "react";
import ReactDOM from "react-dom/client";
import MortgageCalculator from "./App"; // Make sure the file is named App.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MortgageCalculator />
  </React.StrictMode>
);
