import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppThemeProvider } from "./context/ThemeContext";

console.log("MAIN TSX LOADED");
console.log("Router instance:", { router });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
