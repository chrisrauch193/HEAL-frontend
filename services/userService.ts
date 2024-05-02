import axiosInstance from '../api/axiosInstance';
import { UserProfile, RegisterPatientInfo, RegisterDoctorInfo } from '../types/userTypes';

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axiosInstance.post<{ token: string }>('/users/login', credentials);
  return response.data.token;
};

export const registerUser = async (userInfo: RegisterPatientInfo | RegisterDoctorInfo) => {
  const response = await axiosInstance.post<UserProfile>('/users/register', userInfo);
  return response.data;
};

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await axiosInstance.get<UserProfile>(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId: string, userData: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await axiosInstance.put<UserProfile>(`/users/${userId}`, userData);
  return response.data;
};