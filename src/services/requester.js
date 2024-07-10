import axios from 'axios';
import { API_URL } from './../../config';

axios.defaults.withCredentials = true;

// Create a custom axios instance
const api = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  timeout: 10000,
  // withCredentials: true,
  headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
  }
});

export default api;