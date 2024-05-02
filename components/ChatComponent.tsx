import React, { useLayoutEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { chatStyles } from "../styles/chatStyles"; // New style import

const ChatComponent: React.FC<ChatComponentProps> = ({ item }) => {
    const navigation = useNavigation<any>();
    const [messages, setMessages] = useState<Message | null>(null);

    useLayoutEffect(() => {
        setMessages(item.messages[item.messages.length - 1]);
    }, [item.messages]);

    const handleNavigation = () => {
        navigation.navigate("Messaging", {
            id: item.id,
            name: item.name,
        });
    };

    return (
        <Pressable style={chatStyles.chat} onPress={handleNavigation}>
            <Ionicons
                name="person-circle-outline"
                size={45}
                color="black"
                style={chatStyles.avatar}
            />
            <View style={chatStyles.rightContainer}>
                <View>
                    <Text style={chatStyles.username}>{item.name}</Text>
                    <Text style={chatStyles.message}>
                        {messages?.text ? messages.text : "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={chatStyles.time}>
                        {messages?.time ? messages.time : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
