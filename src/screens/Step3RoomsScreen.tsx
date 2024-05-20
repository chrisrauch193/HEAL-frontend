// src/screens/Step3RoomsScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchStep3Rooms } from '../store/slices/chatSlice';
import ChatComponent from '../components/ChatComponent';
import { ChatScreenStyles } from '../styles/ChatScreenStyles';
import { useTranslation } from 'react-i18next';

const Step3RoomsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { step3Rooms, status } = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        dispatch(fetchStep3Rooms());
    }, [dispatch]);

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return <Text style={ChatScreenStyles.emptyText}>{t('errorFetchingRooms')}</Text>;
    }

    return (
        <View style={ChatScreenStyles.container}>
            {step3Rooms.length > 0 ? (
                <FlatList
                    data={step3Rooms}
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

export default Step3RoomsScreen;
