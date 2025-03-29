import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abadankarsitad.shop'

});

export default api;