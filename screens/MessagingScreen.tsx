// src/screens/MessagingScreen.tsx
import React, { useEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialMessages, receivedMessage, addOptimisticMessage } from '../store/slices/chatSlice';
import { RootState } from '../store';
import MessageComponent from "../components/MessageComponent";
import { messagingStyles } from "../styles/messagingStyles";
import initializeSocket from '../api/socket';

const MessagingScreen = ({ route }) => {
    const { roomId } = route.params;
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);
    const messages = useSelector((state: RootState) => state.chat.messages[roomId] || []);
    const [messageText, setMessageText] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const setupChat = async () => {
            try {
                const socketInstance = await initializeSocket(roomId);
                setSocket(socketInstance);

                socketInstance.emit('joinRoom', roomId);

                const messageListener = (message) => {
                    dispatch(receivedMessage({ roomId: roomId, message }));
                };

                socketInstance.on('newMessage', messageListener);

                return () => {
                    socketInstance.off('newMessage', messageListener);
                    socketInstance.disconnect();
                };
            } catch (error) {
                console.error('Error initializing chat:', error);
            }
        };

        dispatch(fetchInitialMessages(roomId));
        setupChat();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [dispatch, roomId]);

    const handleSend = () => {
        if (messageText.trim() && currentUserProfile && currentUserProfile.userId) {
            const messageData = {
                messageId: Math.random().toString(36).substr(2, 9), // Generate a temporary ID
                roomId: roomId,
                senderUserId: currentUserProfile.userId,
                timestamp: new Date().toISOString(),
                content: {
                    text: messageText,
                    metadata: {
                        translations: {},
                        medicalTerms: []
                    }
                }
            };
            dispatch(addOptimisticMessage({ roomId: roomId, message: messageData }));
            socket.emit('sendMessage', messageData);
            setMessageText("");
        }
    };

    return (
        <View style={messagingStyles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageComponent item={item} currentUserId={currentUserProfile?.userId || "unknownUser"} userLanguage={currentUserProfile?.language || "en"} />}
                keyExtractor={(item) => item.messageId ? item.messageId.toString() : 'unknownId'}
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

export default MessagingScreen;
