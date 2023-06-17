import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "../src/admin/admin.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ReservationContextProvider } from "./context/ReservationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReservationContextProvider>
        <App />
      </ReservationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
