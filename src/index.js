import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./Error Boundary/ErrorBoundary";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
 
      <App />
   
    <ToastContainer/>
  </React.StrictMode>
);
export { default as HomePage } from "./component/HomePage/HomePage";