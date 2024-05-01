import React, { useLayoutEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";

// Define types for the message and item props
interface Message {
    id: string;
    text: string;
    time: string;
    user: string;
}

interface Room {
    id: string;
    name: string;
    messages: Message[];
}

interface ChatComponentProps {
    item: Room;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ item }) => {
    const navigation = useNavigation<any>(); // Use any or define a more specific type for navigation
    const [messages, setMessages] = useState<Message | null>(null);

    // Retrieves the last message in the array from the item prop
    useLayoutEffect(() => {
        setMessages(item.messages[item.messages.length - 1]);
    }, [item.messages]);

    // Navigates to the Messaging screen
    const handleNavigation = () => {
        navigation.navigate("Messaging", {
            id: item.id,
            name: item.name,
        });
    };

    return (
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons
                name="person-circle-outline"
                size={45}
                color="black"
                style={styles.cavatar}
            />
            <View style={styles.crightContainer}>
                <View>
                    <Text style={styles.cusername}>{item.name}</Text>
                    <Text style={styles.cmessage}>
                        {messages?.text ? messages.text : "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {messages?.time ? messages.time : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
