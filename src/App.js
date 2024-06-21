import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./Callback";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const scope = "scope";
    const state = "state";

    const authUrl = `https://api.genius.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login with Genius</button>
      ) : (
        <div>
          <h1>Authenticated</h1>
          <p>Access Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/callback" element={<Callback />} />
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);

export default App;
