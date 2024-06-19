const express = require("express");
const { AuthorizationCode } = require("simple-oauth2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3001;

const config = {
  client: {
    id: process.env.REACT_APP_CLIENT_ID,
    secret: process.env.REACT_APP_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://api.genius.com",
    authorizePath: "/oauth/authorize",
    tokenPath: "/oauth/token",
  },
};

const client = new AuthorizationCode(config);

app.get("/auth", (req, res) => {
  const authorizationUri = client.authorizeURL({
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    scope: "basic",
    state: Math.random().toString(36).substring(7),
  });

  res.redirect(authorizationUri);
});

app.get("/callback", async (req, res) => {
  const { code } = req.query;

  const options = {
    code,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  };

  try {
    const accessToken = await client.getToken(options);
    res.json(accessToken.token);
  } catch (error) {
    console.error("Access Token Error", error.message);
    res.status(500).json("Authentication failed");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
