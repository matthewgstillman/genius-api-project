import axios from 'axios';

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const GeniusAPI = axios.create({
  baseURL: 'https://api.genius.com',
  headers: {
    Authorization: `Bearer YOUR_ACCESS_TOKEN`
  }
});

export const searchSong = (query) => {
  return GeniusAPI.get(`/search?q=${query}`);
};

export const getSongDetails = (songId) => {
  return GeniusAPI.get(`/songs/${songId}`);
};