import axios from 'axios';

const api = axios.create({
  baseURL: 'https://deck-chips-server.herokuapp.com/api/v1/',
  timeout: 15000,
});

export default api;
