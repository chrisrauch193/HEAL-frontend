// services/userService.ts
import axiosInstance from '../api/axiosInstance';
import { UserProfile, RegisterPatientInfo, RegisterDoctorInfo } from '../types/userTypes';

export const verifyToken = async () => {
  try {
    const headers = {
      'x-mock-response-name': 'Verify Token Success' // For mock purposes
    };
    const response = await axiosInstance.get<UserProfile>('/users/verify-token', { headers });
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
  const headers = {
    'x-mock-response-name': 'Login Success' // Add x-mock-response-name header
  };
  const response = await axiosInstance.post<{ token: string }>('/users/login', credentials, { headers });
  return response.data;
};

export const registerUser = async (userInfo: RegisterPatientInfo | RegisterDoctorInfo) => {
  const headers = {
    'x-mock-response-name': 'Register Patient Created' // Add x-mock-response-name header
  };
  const response = await axiosInstance.post<UserProfile>('/users/register', userInfo, { headers });
  return response.data;
};

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const headers = {
    'x-mock-response-name': 'Get User (Patient) Success' // Add x-mock-response-name header
  };
  const response = await axiosInstance.get<UserProfile>(`/users/${userId}`, { headers });
  return response.data;
};

export const updateUserProfile = async (userId: string, userData: Partial<UserProfile>): Promise<UserProfile> => {
  const headers = {
    'x-mock-response-name': 'Update User Success' // Add x-mock-response-name header
  };
  const response = await axiosInstance.put<UserProfile>(`/users/${userId}`, userData, { headers });
  return response.data;
};
