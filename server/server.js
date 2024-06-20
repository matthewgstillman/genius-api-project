const express = require("express");
const axios = require("axios");
const qs = require("querystring");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.get("/auth", (req, res) => {
  const authorizationUrl = `https://api.genius.com/oauth/authorize?${qs.stringify(
    {
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      scope: "basic",
      response_type: "code",
    }
  )}`;

  res.redirect(authorizationUrl);
});

app.post("/callback", async (req, res) => {
  const { code } = req.body;

  const tokenUrl = "https://api.genius.com/oauth/token";
  const tokenData = {
    code,
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(tokenUrl, qs.stringify(tokenData), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = response.data;
    res.json({ access_token });
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
