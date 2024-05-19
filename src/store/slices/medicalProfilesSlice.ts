// store/slices/medicalProfilesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile } from '@src/services/userService';
import { UserProfile } from '@types/userTypes';

interface MedicalProfilesState {
  viewedProfiles: Record<string, UserProfile>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MedicalProfilesState = {
  viewedProfiles: {},
  status: 'idle',
};

export const fetchUserProfileById = createAsyncThunk(
  'medicalProfiles/fetchUserProfileById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const viewedProfile = await fetchUserProfile(userId);
      return { userId, viewedProfile };
    } catch (error) {
      return rejectWithValue('Failed to fetch profile');
    }
  }
);

const medicalProfilesSlice = createSlice({
  name: 'medicalProfiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfileById.fulfilled, (state, action) => {
        const { userId, viewedProfile } = action.payload;
        state.viewedProfiles[userId] = viewedProfile;
        state.status = 'idle';
      })
      .addCase(fetchUserProfileById.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default medicalProfilesSlice.reducer;
