import axiosInstance from '../api/axiosInstance';
import { UserProfile } from '../types/userTypes';

// Function to fetch a user profile
export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await axiosInstance.get<UserProfile>(`/users/${userId}`);
  return response.data;
};
