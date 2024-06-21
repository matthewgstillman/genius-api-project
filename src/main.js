import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-oauth2-code-pkce";
import Callback from "./Callback";
import App from "./App";

const authConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  authorizationEndpoint: process.env.REACT_APP_AUTHORITY,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
};

const Main = () => (
  <AuthProvider authConfig={authConfig}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default Main;
