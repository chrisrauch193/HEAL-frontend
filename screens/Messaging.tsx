import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import socket from "../utils/socket";
import MessageComponent from "../components/MessageComponent";
import { messagingStyles } from "../styles/messagingStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChatMessage {
    id: string;
    text: string;
    time: string;
    user: string;
}

interface RouteParams {
    name: string;
    id: string;
}

const Messaging: React.FC<{ route: { params: RouteParams }, navigation: any }> = ({ route, navigation }) => {
    const [user, setUser] = useState<string>("");
    const { name, id } = route.params;

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState<string>("");

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
            console.error("Error while loading username!");
        }
    };

    const handleNewMessage = () => {
        const timestamp = new Date().toISOString();

        if (user) {
            socket.emit("send_message", {
                room_id: id,
                sender_user_id: user,
                timestamp,
                content: {
                    text: message
                }
            });
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        getUsername();
        socket.emit("join_room", id);
        socket.on("joined_room", (roomChats: ChatMessage[]) => setChatMessages(roomChats));
    }, []);

    useEffect(() => {
        socket.on("joined_room", (roomChats: ChatMessage[]) => setChatMessages(roomChats));
    }, [socket]);

    return (
        <View style={messagingStyles.container}>
            <View
                style={[
                    messagingStyles.container,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {chatMessages[0] ? (
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <MessageComponent item={item} user={user} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    ""
                )}
            </View>

            <View style={messagingStyles.inputContainer}>
                <TextInput
                    style={messagingStyles.input}
                    onChangeText={(value) => setMessage(value)}
                />
                <Pressable
                    style={messagingStyles.buttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default Messaging;
