// src/components/ChatComponent.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { chatStyles } from "../styles/chatStyles";
import { ChatRoom } from '../types/chatTypes';

import { useTranslation } from 'react-i18next';

const ChatComponent = ({ item }: { item: ChatRoom }) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate("MessagingScreen", { roomId: item.roomId, roomName: item.roomName });
    };

    const { t } = useTranslation();
    return (
        <Pressable style={chatStyles.chat} onPress={handleNavigation}>
            <View style={chatStyles.rightContainer}>
                <Text style={chatStyles.username}>{item.roomName}</Text>
                <Text style={chatStyles.message}>{t('tapToStartChatting')}</Text>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
