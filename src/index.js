import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "react-oauth2-code-pkce";

const authConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  authorizationEndpoint: "https://api.genius.com/oauth/authorize",
  tokenEndpoint: "https://api.genius.com/oauth/token",
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scopes: ["basic"],
};

console.log(authConfig);
console.log(process.env.REACT_APP_CLIENT_ID);
console.log(process.env.REACT_APP_REDIRECT_URI);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider authConfig={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
