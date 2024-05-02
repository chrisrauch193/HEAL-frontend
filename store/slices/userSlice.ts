import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  userData: any | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.userData = null;
    }
  }
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
