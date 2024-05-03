// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Chat from './screens/Chat';
import Messaging from './screens/Messaging';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading">
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Messaging" component={Messaging} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
