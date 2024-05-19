// src/screens/AuthLoadingScreen.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserToken } from '@store/slices/userSlice';
import { RootState } from '@store';
import AuthLoadingScreenStyles from '@styles/AuthLoadingScreenStyles';
import { useTranslation } from 'react-i18next';

const AuthLoadingScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { currentUserProfile, status } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(verifyUserToken());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'idle' && currentUserProfile) {
            navigation.navigate('ChatScreen');
        } else if (status === 'failed') {
            navigation.navigate('LoginScreen');
        }
    }, [status, currentUserProfile, navigation]);

    return (
        <View style={AuthLoadingScreenStyles.container}>
            <ActivityIndicator size="large" />
            {status === 'failed' && <Text style={AuthLoadingScreenStyles.text}>{t('authenticationFailedRedirecting')}</Text>}
        </View>
    );
};

export default AuthLoadingScreen;
