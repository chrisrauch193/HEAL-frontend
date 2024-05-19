import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChatScreen from './screens/ChatScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import LoginScreen from './screens/LoginScreen';
import MessagingScreen from './screens/MessagingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';

import i18n from './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AuthLoadingScreen">
            <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: t('consultations') }} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: t('editProfile') }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: t('login') }} />
            <Stack.Screen name="MessagingScreen" component={MessagingScreen} options={{ title: t('consultations') }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: t('profile') }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: t('register') }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
