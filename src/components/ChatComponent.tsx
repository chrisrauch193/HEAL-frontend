// src/components/ChatComponent.tsx
import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChatComponentStyles } from "../styles/ChatComponentStyles";
import { ChatRoom } from '../types/chatTypes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addParticipantToRoom } from '../services/chatService';
import { fetchStep2Rooms } from '../store/slices/chatSlice';
import { useTranslation } from 'react-i18next';

const ChatComponent = ({ item, step }: { item: ChatRoom, step: number }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);

    const handleNavigation = async () => {
        if (currentUserProfile?.type === 'DOCTOR') {
            if (step === 1 || step === 3) {
                try {
                    await addParticipantToRoom(item.roomId.toString(), currentUserProfile.userId.toString());
                    dispatch(fetchStep2Rooms());
                    navigation.navigate('MessagingScreen', { roomId: item.roomId, roomName: item.roomName });
                } catch (error) {
                    Alert.alert(t('error'), t('errorJoiningRoom'));
                }
            } else {
                navigation.navigate('MessagingScreen', { roomId: item.roomId, roomName: item.roomName });
            }
        } else {
            navigation.navigate('MessagingScreen', { roomId: item.roomId, roomName: item.roomName });
        }
    };

    return (
        <Pressable style={ChatComponentStyles.chat} onPress={handleNavigation}>
            <View style={ChatComponentStyles.rightContainer}>
                <Text style={ChatComponentStyles.username}>{item.roomName}</Text>
                <Text style={ChatComponentStyles.message}>{t('tapToStartChatting')}</Text>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
