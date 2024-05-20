// src/screens/Step1RoomsScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchStep1Rooms, addOptimisticRoom } from '../store/slices/chatSlice';
import ChatComponent from '../components/ChatComponent';
import { createChatRoom } from '../services/chatService';
import { ChatScreenStyles } from '../styles/ChatScreenStyles';
import { useTranslation } from 'react-i18next';

const Step1RoomsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { step1Rooms, status } = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        dispatch(fetchStep1Rooms());
    }, [dispatch]);

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return <Text style={ChatScreenStyles.emptyText}>{t('errorFetchingRooms')}</Text>;
    }

    return (
        <View style={ChatScreenStyles.container}>
            {step1Rooms.length > 0 ? (
                <FlatList
                    data={step1Rooms}
                    renderItem={({ item }) => <ChatComponent item={item} />}
                    keyExtractor={(item) => item.roomId}
                />
            ) : (
                <View style={ChatScreenStyles.emptyContainer}>
                    <Text style={ChatScreenStyles.emptyText}>{t('noRoomsCreated')}</Text>
                </View>
            )}
        </View>
    );
};

export default Step1RoomsScreen;
