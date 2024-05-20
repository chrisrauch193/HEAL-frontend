// api/axiosIntances.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Define backendUrl based on the platform and environment
const isDev = process.env.NODE_ENV === 'development';
const localHostIP = '192.168.19.98'; // Your local network IP, change as necessary

const backendUrl = isDev ? `http://${localHostIP}:8888` : Platform.select({
  web: '/api',
  default: 'http://13.208.164.92:8888'
});

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
