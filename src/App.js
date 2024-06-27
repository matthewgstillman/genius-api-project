import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./Callback";
import SearchSongComponent from "./components/SearchSongComponent";
import axios from "axios";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const getApiData = () => {
    const params = {
      response_type: "code",
      client_id:
        "bbgbwThMyJzgUxDRvzpvfd02u4DGOkqxCt6cT2CZ63ZvWDhUT5t160vPc_g32hm5",
      redirect_uri: "http://localhost:3000/callback",
      scope: "me",
      state:
        "z2g86qfwiikclient_id=bbgbwThMyJzgUxDRvzpvfd02u4DGOkqxCt6cT2CZ63ZvWDhUT5t160vPc_g32hm5",
      redirect_uri: "http://localhost:3001/auth/callback",
      scope: "REQUESTED_SCOPE",
      state: "SOME_STATE_VALUE",
      // response_type: "code",
      response_type: "json",
    };

    const url = "https://api.genius.com/oauth/authorize";

    axios
      .get(url, { params })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // const token = process.env.REACT_APP_TOKEN;
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
      getApiData();
    }
  }, []);

  const generateRandomState = () => {
    const state = Math.random().toString(36).substring(2, 15);
    return state;
  };

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const scope = "me";
    const state = generateRandomState();

    const authUrl = `https://api.genius.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&state=${state}`;

    alert(`Authorization URL: ${authUrl}`);
    localStorage.setItem("lastAuthUrl", authUrl);

    window.location.href = authUrl;
  };

  const fetchPublicData = async () => {
    const clientAccessToken = process.env.REACT_APP_CLIENT_ACCESS_TOKEN;
    try {
      const response = await fetch(
        "https://api.genius.com/some_public_endpoint",
        {
          headers: {
            Authorization: `Bearer ${clientAccessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching public data", error);
    }
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login with Genius</button>
      ) : (
        <div>
          <h1>Authenticated</h1>
          <p>Access Token: {accessToken}</p>
          <button onClick={fetchPublicData}>Fetch Public Data</button>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/callback" element={<Callback />} />
      <Route path="/" element={<Home />} />
      <Route path="/searchSong" element={<SearchSongComponent />} />
    </Routes>
  </Router>
);

export default App;
