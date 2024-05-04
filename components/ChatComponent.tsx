// src/components/ChatComponent.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { chatStyles } from "../styles/chatStyles";
import { ChatRoom } from '../types/chatTypes';

const ChatComponent = ({ item }: { item: ChatRoom }) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate("MessagingScreen", { roomId: item.roomId, roomName: item.roomName });
    };

    return (
        <Pressable style={chatStyles.chat} onPress={handleNavigation}>
            <Ionicons name="person-circle-outline" size={45} color="black" style={chatStyles.avatar} />
            <View style={chatStyles.rightContainer}>
                <Text style={chatStyles.username}>{item.roomName}</Text>
                <Text style={chatStyles.message}>Tap to start chatting</Text>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
