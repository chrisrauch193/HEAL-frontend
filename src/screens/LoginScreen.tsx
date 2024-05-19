// src/screens/Login.tsx
import React, { useState } from 'react';
import { Text, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '@store/slices/userSlice'; // Adjust path if necessary
import { RootState } from '@store'; // Adjust path if necessary
import { LoginScreenStyles } from '@styles/LoginScreenStyles';
import { GlobalStyles } from '@src/styles/GlobalStyles';

// TypeScript types for navigation prop
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

import { useTranslation } from 'react-i18next';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface LoginProps {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
    const { t } = useTranslation();
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
                Alert.alert(t('loginError'), error.message || t('unableToLogin'));
            }
        } else {
            Alert.alert(t('error'), t('bothEmailAndPassword'));
        }
    };

    const handleRegister = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <ScrollView style={LoginScreenStyles.container}>
            <Text style={LoginScreenStyles.heading}>{t('signIn')}</Text>
            <TextInput
                autoCorrect={false}
                placeholder={t('enterYourEmail')}
                style={LoginScreenStyles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                secureTextEntry={true}
                placeholder={t('enterYourPassword')}
                style={LoginScreenStyles.input}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <Pressable style={GlobalStyles.button} onPress={handleSignIn} disabled={status === 'loading'}>
                <Text style={GlobalStyles.buttonText}>{t('getStarted')}</Text>
            </Pressable>
            <Pressable onPress={handleRegister}>
                <Text style={LoginScreenStyles.registerLink}>{t('registerHere')}</Text>
            </Pressable>
        </ScrollView>
    );
};

export default LoginScreen;
