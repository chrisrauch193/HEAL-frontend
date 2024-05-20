// src/components/ChatComponent.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChatComponentStyles } from "../styles/ChatComponentStyles";
import { ChatRoom } from '../types/chatTypes';

import { useTranslation } from 'react-i18next';

const ChatComponent = ({ item }: { item: ChatRoom }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate("MessagingScreen", { roomId: item.roomId, roomName: item.roomName });
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
