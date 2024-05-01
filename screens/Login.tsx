import React, { useState } from 'react';
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

// TypeScript types for navigation prop
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Adjust the import based on your file structure

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
    navigation: LoginScreenNavigationProp;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');

    // Checks if the input field is empty
    const handleSignIn = () => {
        if (username.trim()) {
            // Logs the username to the console
            console.log({ username });
        } else {
            Alert.alert('Username is required.');
        }
    };

    return (
        <SafeAreaView style={styles.loginscreen}>
            <View style={styles.loginscreen}>
                <Text style={styles.loginheading}>Sign in</Text>
                <View style={styles.logininputContainer}>
                    <TextInput
                        autoCorrect={false}
                        placeholder='Enter your username'
                        style={styles.logininput}
                        onChangeText={(value: string) => setUsername(value)}
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
