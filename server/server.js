const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post("https://api.genius.com/oauth/token", {
      code: code,
      client_id: process.env.GENIUS_CLIENT_ID,
      client_secret: process.env.GENIUS_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      response_type: "code",
      grant_type: "authorization_code",
    });

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to exchange code for token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
