import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from '../../types/userTypes';
import { fetchUserProfile } from '../../services/userService';

interface UserState {
  profile: UserProfile | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  profile: null,
  status: 'idle',
};

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'idle';
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default userSlice.reducer;
