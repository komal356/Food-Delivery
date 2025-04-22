import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import App from "./App";
import "./index.css";
import StoreContextProvider from "./Context/StoreContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <StoreContextProvider>

      <App />
    </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
