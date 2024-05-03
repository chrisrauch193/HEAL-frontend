// screens/Messaging.tsx
import React, { useEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialMessages, receivedMessage, addOptimisticMessage } from '../store/slices/chatSlice';
import { RootState } from '../store';
import MessageComponent from "../components/MessageComponent";
import { messagingStyles } from "../styles/messagingStyles";
import socket from '../utils/socket';

const Messaging = ({ route }) => {
    const { room_id } = route.params;
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.profile);
    const messages = useSelector((state: RootState) => state.chat.messages[room_id] || []);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        dispatch(fetchInitialMessages(room_id));
        socket.emit('join_room', room_id);

        socket.on('new_message', (message) => {
            dispatch(receivedMessage({ roomId: room_id, message }));
        });

        return () => {
            socket.off('new_message');
        };
    }, [dispatch, room_id]);

    const handleSend = () => {
        if (messageText.trim() && currentUser && currentUser.user_id) {
            const messageData = {
                message_id: Math.random().toString(36).substr(2, 9), // Generate a temporary ID
                room_id,
                sender_user_id: currentUser.user_id,
                timestamp: new Date().toISOString(),
                content: {
                    text: messageText,
                    metadata: {
                        translations: {},
                        medical_terms: []
                    }
                }
            };
            dispatch(addOptimisticMessage({ roomId: room_id, message: messageData }));
            socket.emit('send_message', messageData);
            setMessageText("");
        }
    };

    return (
        <View style={messagingStyles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageComponent item={item} current_user_id={currentUser?.user_id || "unknown_user"} userLanguage={currentUser?.language || "en"} />}
                keyExtractor={(item) => item.message_id ? item.message_id.toString() : 'unknown_id'}
            />
            <View style={messagingStyles.inputContainer}>
                <TextInput
                    style={messagingStyles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type a message"
                    multiline={true}
                    numberOfLines={4}
                />
                <Pressable style={messagingStyles.buttonContainer} onPress={handleSend}>
                    <Text style={messagingStyles.buttonText}>SEND</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Messaging;
