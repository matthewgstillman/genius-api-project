import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.genius.com',
});

const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { api, setAuthToken };

