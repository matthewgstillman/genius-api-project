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

console.log("REACT_APP_CLIENT_ID:", process.env.REACT_APP_CLIENT_ID);
console.log("REACT_APP_REDIRECT_URI:", process.env.REACT_APP_REDIRECT_URI);

if (!authConfig.clientId) {
  console.error("REACT_APP_CLIENT_ID is not set");
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <AuthProvider authConfig={authConfig}> */}
    <App />
    {/* </AuthProvider> */}
  </React.StrictMode>
);
