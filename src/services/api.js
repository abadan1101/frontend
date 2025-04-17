import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-sa9a.onrender.com'

});

export default api;