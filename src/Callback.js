import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    console.log("Authorization code:", code);
    console.log("State:", state);

    if (code) {
      fetchAccessToken(code);
    } else {
      console.error("Authorization code not found in URL");
    }
  }, []);

  const fetchAccessToken = async (code) => {
    try {
      const response = await fetch("https://api.genius.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        navigate("/");
      } else {
        console.error("Failed to obtain access token", data);
      }
    } catch (error) {
      console.error("Error fetching access token", error);
    }
  };

  return <div>Loading...</div>;
};

export default Callback;
