import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile, loginUser, registerUser, updateUserProfile, verifyToken } from '../../services/userService';
import { UserProfile, RegisterPatientInfo, RegisterDoctorInfo } from '../../types/userTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  profile: UserProfile | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  profile: null,
  token: null,
  status: 'idle',
};

// Async thunk for verifying the token
export const verifyUserToken = createAsyncThunk(
  'user/verifyToken',
  async (_, { rejectWithValue }) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return rejectWithValue('No token found');
    const result = await verifyToken();
    if (result.isValid) {
      return { user: result.user, token: token };
    } else {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userProfile'); // Assuming you store user profile data
      return rejectWithValue('Token invalid');
    }
  }
);

// Async thunk for user login
export const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { user, token } = await loginUser(credentials);
      await AsyncStorage.setItem('userToken', token);
      return { user, token };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

// Async thunk for user registration
export const registerNewUser = createAsyncThunk(
  'user/register',
  async (userInfo: RegisterPatientInfo | RegisterDoctorInfo, { rejectWithValue }) => {
    try {
      const { user, token } = await registerUser(userInfo);
      await AsyncStorage.setItem('userToken', token);
      return { user, token };
    } catch (error) {
      return rejectWithValue('Registration failed');
    }
  }
);

// Async thunk for fetching user profile
export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await fetchUserProfile(userId);
    } catch (error) {
      return rejectWithValue('Failed to fetch profile');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }: { userId: string; userData: Partial<UserProfile> }, { rejectWithValue }) => {
    try {
      return await updateUserProfile(userId, userData);
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      AsyncStorage.removeItem('userToken');
      state.profile = null;
      state.token = null;
      state.status = 'idle';
    },
    clearUserProfile: (state) => {
      state.profile = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyUserToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.profile = action.payload.user;
        state.status = 'idle';  // Successfully verified
      })
      .addCase(verifyUserToken.rejected, (state) => {
        state.status = 'failed';  // Verification failed
      })
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.profile = action.payload.user;
        state.status = 'idle';
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerNewUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        state.token = action.payload.token;
        state.status = 'idle';
      })
      .addCase(registerNewUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'idle';
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'idle';
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { logoutUser, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
