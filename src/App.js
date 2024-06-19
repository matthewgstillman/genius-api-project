import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.get(
            `http://localhost:3001/callback?code=${code}`
          );
          setAccessToken(response.data.access_token);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Authentication failed", error);
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth";
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

export default App;
