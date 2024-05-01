import React, { useLayoutEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';

// Import the app styles
import { styles } from '../utils/styles';

import AsyncStorage from "@react-native-async-storage/async-storage";

// TypeScript types for navigation prop
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
    navigation: LoginScreenNavigationProp;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');

    const storeUsername = async () => {
        try {
            await AsyncStorage.setItem("username", username);
            navigation.navigate("Chat");
        } catch (e) {
            Alert.alert("Error! While saving username");
        }
    };

    // Checks if the input field is empty
    const handleSignIn = () => {
        if (username.trim()) {
            // Logs the username to the console
            console.log({ username });
        } else {
            Alert.alert('Username is required.');
        }
    };

    useLayoutEffect(() => {
        const getUsername = async () => {
            try {
                const value = await AsyncStorage.getItem("username");
                if (value !== null) {
                    navigation.navigate("Chat");
                }
            } catch (e) {
                console.error("Error while loading username!");
            }
        };
        getUsername();
    }, [navigation]); // Added navigation as a dependency

    return (
        <SafeAreaView style={styles.loginscreen}>
            <View style={styles.loginscreen}>
                <Text style={styles.loginheading}>Sign in</Text>
                <View style={styles.logininputContainer}>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Enter your username"
                        style={styles.logininput}
                        onChangeText={setUsername}
                    />
                </View>

                <Pressable onPress={handleSignIn} style={styles.loginbutton}>
                    <View>
                        <Text style={styles.loginbuttonText}>Get Started</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Login;
