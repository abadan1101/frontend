import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://backend-sa9a.onrender.com'
  baseURL: 'http://localhost:3333/'

});

export default api;