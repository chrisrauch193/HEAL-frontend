// src/App.tsx
import 'intl-pluralrules';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChatScreen from './screens/ChatScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import LoginScreen from './screens/LoginScreen';
import MessagingScreen from './screens/MessagingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

import i18n, { changeLanguage } from './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();
  const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);

  useEffect(() => {
    if (currentUserProfile?.language) {
      changeLanguage(currentUserProfile.language);
    }
  }, [currentUserProfile]);

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoadingScreen" screenOptions={{ cardStyle: { flex: 1 } }}>
          <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: t('consultations') }} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: t('editProfile') }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: t('login') }} />
          <Stack.Screen name="MessagingScreen" component={MessagingScreen} options={{ title: t('consultations') }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: t('profile') }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: t('register') }} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
