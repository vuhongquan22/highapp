import axios from 'axios';
import { apiUrl } from '../config/constants/api';
// import {
//   onRequestSuccess,
// } from "../config/interceptor";

/**
 * Create basic config axios
 */
export const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  timeout: 15000,
});

// apiClient.interceptors.request.use(onRequestSuccess);