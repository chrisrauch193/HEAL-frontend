// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import userReducer from './slices/userSlice';
import medicalProfilesReducer from './slices/medicalProfilesSlice';

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
