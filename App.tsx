import React from 'react';

// Screens
import Login from './screens/Login';
import Messaging from './screens/Messaging';
import Chat from './screens/Chat';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    Chat: undefined;
    Messaging: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
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
    );
};

export default App;
