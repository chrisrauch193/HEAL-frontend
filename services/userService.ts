// services/userService.ts
import axiosInstance from '../api/axiosInstance';
import { UserProfile, RegisterPatientInfo, RegisterDoctorInfo } from '../types/userTypes';

export const verifyToken = async () => {
  try {
    const response = await axiosInstance.get<UserProfile>('/users/verify-token');
    if (response.data && response.data.email) { // Assuming email is a required field in the user profile
      return { user: response.data, isValid: true };
    } else {
      throw new Error("Invalid token or user data incomplete.");
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return { isValid: false };
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post<{ token: string }>('/users/login', credentials)
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("ASHDAJKSHDAJKSDHADS");
    console.log(error);
  }
  return null;
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
