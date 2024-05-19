// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '@store/slices/chatSlice';
import userReducer from '@store/slices/userSlice';
import medicalProfilesReducer from '@store/slices/medicalProfilesSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
    medicalProfiles: medicalProfilesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',  // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
