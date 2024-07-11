import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./Callback";
import SearchSongComponent from "./components/SearchSongComponent";
import axios from "axios";

let myAccessTokenHuzzah;

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const getApiData = () => {
    const params = {
      response_type: "code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: "http://localhost:3000",
      scope: "me",
      // state:
      //   "z2g86qfwiikclient_id=bbgbwThMyJzgUxDRvzpvfd02u4DGOkqxCt6cT2CZ63ZvWDhUT5t160vPc_g32hm5",
      scope: "me",
      state: "",
      // response_type: "code",
      response_type: "json",
    };

    const url = "https://api.genius.com/oauth/authorize?";

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
    )}&scope=${scope}`;

    alert(`Authorization URL: ${authUrl}`);
    localStorage.setItem("lastAuthUrl", authUrl);

    window.location.href = authUrl;
  };

  const fetchPublicData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/https://api.genius.com/account",
        {
          headers: {
            Authorization: `Bearer ${myAccessTokenHuzzah}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Account Info:", response.data);
    } catch (error) {
      console.error("Error fetching public data", error);
    }
  };

  const handleToken = async () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const authorizationCode = new URLSearchParams(window.location.search).get(
      "code"
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/https://api.genius.com/oauth/token",
        {
          code: authorizationCode,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
          response_type: "code",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Assuming response.data contains the access token
      const accessToken = response.data.access_token;
      myAccessTokenHuzzah = response.data.access_token;
      console.log("Access Token:", accessToken);

      // Now you can use the access token for API requests
      // For example, save it to localStorage or state for future use
      localStorage.setItem("accessToken", accessToken);

      // Optionally, redirect or navigate to another page after successful token retrieval
      // window.location.href = "/dashboard"; // Example redirect
    } catch (error) {
      console.error(
        "Error exchanging code for token:",
        error.response || error.message
      );
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="App">
      <p>click this, itll redirect to the login page for genuis</p>
      <button onClick={handleLogin}>Login with Genius</button>
      <div>
        {/* <h1>Authenticated</h1>
          <p>Access Token: {accessToken}</p> */}
        <p>Cool, if that worked and this redirect look at the url bar</p>
        <p>
          The url has the code? Okay, watch in the dev tools 'network' panel and
          click this button.{" "}
        </p>
        <button onClick={handleToken}>Use that token</button>
        <p>
          Did token endpoint return the access token? Great, we can make a
          request now:
        </p>
        <button onClick={fetchPublicData}>Fetch Public Data</button>
        <p>Watch the console - user metadata will be returned, victory!</p>
        <button></button>
      </div>
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
