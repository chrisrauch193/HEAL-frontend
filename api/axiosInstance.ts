// api/axiosIntances.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import applyMockAdapter from '../mock/server';

const { backendUrl, useMock } = Constants.expoConfig.extra;

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

// if (useMock) {
if (false) {
  applyMockAdapter(axiosInstance);
}

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
