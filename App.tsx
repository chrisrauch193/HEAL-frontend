import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserToken } from './store/slices/userSlice';

// Screens
import Login from './screens/Login';
import Register from './screens/Register';
import Messaging from './screens/Messaging';
import Chat from './screens/Chat';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Chat: undefined;
    Messaging: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(loadUserToken()); // Load user token when the app starts
    // }, []); // Empty dependency array to run only once on app startup

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Register'
                        component={Register}
                        options={{ title: 'Register' }}
                    />
                    <Stack.Screen
                        name='Chat'
                        component={Chat}
                        options={{
                            title: 'Chats',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name='Messaging' component={Messaging} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
