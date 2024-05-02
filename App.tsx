// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Messaging from './screens/Messaging';
import Chat from './screens/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
                    <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chats', headerShown: false }} />
                    <Stack.Screen name="Messaging" component={Messaging} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
