import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-sa9a.onrender.com',
  // baseURL: 'http://localhost:3333',
  withCredentials: true, // importante para enviar cookies
});

export default api;