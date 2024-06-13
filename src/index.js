import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "react-oauth2-code-pkce";

const authConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  authorizationUrl: "https://api.genius.com/oauth/authorize",
  tokenUrl: "https://api.genius.com/oauth/token",
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scopes: ["basic"],
};

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authConfig={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
