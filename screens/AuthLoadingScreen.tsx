// AuthLoadingScreen.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserToken } from '../store/slices/userSlice';
import { RootState } from '../store';

const AuthLoadingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { profile, status } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(verifyUserToken());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'idle' && profile) {
            navigation.navigate('Chat');
        } else if (status === 'failed') {
            navigation.navigate('Login');
        }
    }, [status, profile, navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            {status === 'failed' && <Text>Authentication failed, redirecting...</Text>}
        </View>
    );
};

export default AuthLoadingScreen;
