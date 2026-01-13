import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#020617",
          color: "#f8fafc",
          border: "1px solid rgba(148,163,184,0.25)",
        },
      }}
    />
  </React.StrictMode>
);

console.log("API URL =", import.meta.env.VITE_API_URL);
