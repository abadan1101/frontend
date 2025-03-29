import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abadankaristad.shop'

});

export default api;