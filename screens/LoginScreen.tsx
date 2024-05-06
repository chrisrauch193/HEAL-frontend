// screens/Login.tsx
import React, { useState } from 'react';
import {
    Text, ScrollView, TextInput, Pressable, Alert, Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../store/slices/userSlice'; // Adjust path if necessary
import { RootState } from '../store'; // Adjust path if necessary
import { loginStyles } from '../styles/loginStyles';

// TypeScript types for navigation prop
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface LoginProps {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const { status } = useSelector((state: RootState) => state.user);

    const handleSignIn = async () => {
        if (email.trim() && password.trim()) {
            try {
                const actionResult = await dispatch(authenticateUser({ email, password }));
                if (authenticateUser.fulfilled.match(actionResult)) {
                    navigation.navigate("ChatScreen");
                } else {
                    throw new Error('Login failed');
                }
            } catch (error) {
                Alert.alert("Login Error", error.message || "Unable to login");
            }
        } else {
            Alert.alert('Error', 'Both email and password are required.');
        }
    };

    const handleRegister = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <ScrollView style={loginStyles.container}>
            <Text style={loginStyles.heading}>Sign in</Text>
            <TextInput
                autoCorrect={false}
                placeholder="Enter your email"
                style={loginStyles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Enter your password"
                style={loginStyles.input}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <Button
                title="Get Started"
                onPress={handleSignIn}
                disabled={status === 'loading'}
            />
            <Pressable onPress={handleRegister}>
                <Text style={{ color: 'blue' }}>Don't have an account? Register here</Text>
            </Pressable>
        </ScrollView>
    );
};

export default LoginScreen;
