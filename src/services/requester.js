import axios from 'axios';
import NProgress from 'nprogress';
import { API_URL as baseURL } from './../Config';

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  timeout: 30000,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  NProgress.start();
  return config;
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  NProgress.done();
  return response;
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

export default axiosInstance;