// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/', // Because Vite proxy is configured
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

export default api;
