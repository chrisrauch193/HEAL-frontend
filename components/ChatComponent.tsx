import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { chatStyles } from "../styles/chatStyles";
import { ChatRoom } from '../types/chatRoomTypes'; // Adjusted import path

interface ChatComponentProps {
    item: ChatRoom;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ item }) => {
    const navigation = useNavigation<any>();

    const handleNavigation = () => {
        navigation.navigate("Messaging", { room_id: item.room_id, room_name: item.room_name });
    };

    return (
        <Pressable style={chatStyles.chat} onPress={handleNavigation}>
            <Ionicons name="person-circle-outline" size={45} color="black" style={chatStyles.avatar} />
            <View style={chatStyles.rightContainer}>
                <Text style={chatStyles.username}>{item.room_name}</Text>
                <Text style={chatStyles.message}>Tap to start chatting</Text>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
