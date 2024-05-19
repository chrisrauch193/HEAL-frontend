// screens/AuthLoadingScreen.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserToken } from '../store/slices/userSlice';
import { RootState } from '../store';

import { useTranslation } from 'react-i18next';

const AuthLoadingScreen = ({ navigation }) => {
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

    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            {status === 'failed' && <Text>{t('authenticationFailedRedirecting')}</Text>}
        </View>
    );
};

export default AuthLoadingScreen;
