import React, { useEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialMessages, fetchMoreMessages, receivedMessage, addOptimisticMessage } from '../store/slices/chatSlice';
import { RootState } from '../store';
import MessageComponent from "../components/MessageComponent";
import { messagingStyles } from "../styles/messagingStyles";
import initializeSocket from '../api/socket';

import { useTranslation } from 'react-i18next';

const MessagingScreen = ({ route }) => {
    const { roomId } = route.params;
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);
    const messages = useSelector((state: RootState) => state.chat.messages[roomId] || []);
    const [messageText, setMessageText] = useState("");
    const [socket, setSocket] = useState(null);
    const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setupChat = async () => {
            try {
                const socketInstance = await initializeSocket(roomId);
                setSocket(socketInstance);

                const messageListener = (message) => {
                    dispatch(receivedMessage({ roomId, message }));
                    console.log(message);
                };

                socketInstance.on('message', messageListener);

                return () => {
                    socketInstance.off('message', messageListener);
                    socketInstance.disconnect();
                };
            } catch (error) {
                console.error('Error initializing chat:', error);
            }
        };

        dispatch(fetchInitialMessages({ roomId, page: 1, limit: 20 }));
        setupChat();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [dispatch, roomId]);

    const handleSend = () => {
        const timestamp = new Date().toISOString();
        if (messageText.trim() && currentUserProfile && currentUserProfile.userId) {
            const messageData = {
                messageId: Math.random().toString(36).substr(2, 9), // Generate a temporary ID
                roomId: roomId,
                senderUserId: currentUserProfile.userId,
                timestamp,
                content: {
                    text: messageText,
                    metadata: {
                        translations: {},
                        medicalTerms: []
                    }
                }
            };
            const messageToSend = {
                timestamp, 
                text: messageText
            }
            // dispatch(addOptimisticMessage({ roomId: roomId, message: messageData }));
            socket.emit('message', messageToSend);
            setMessageText("");
        }
    };

    const fetchMore = () => {
        // if (!loading) {
        //     setLoading(true);
        //     setPage(page + 1);
        //     dispatch(fetchMoreMessages({ roomId, page: page + 1, limit: 20 })).then(() => setLoading(false));
        // }
    };

    const { t } = useTranslation();
    return (
        <View style={messagingStyles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageComponent item={item} currentUserId={currentUserProfile?.userId || "unknownUser"} userLanguage={currentUserProfile?.language || "en"} />}
                keyExtractor={(item) => item.messageId ? item.messageId.toString() : 'unknownId'}
                // onEndReached={fetchMore}
                // onEndReachedThreshold={0.1}
                // ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                inverted // This will show the newest messages at the bottom
            />
            <View style={messagingStyles.inputContainer}>
                <TextInput
                    style={messagingStyles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder={t('typeAMessage')}
                    multiline={true}
                    numberOfLines={4}
                />
                <Pressable style={messagingStyles.buttonContainer} onPress={handleSend}>
                    <Text style={messagingStyles.buttonText}>{t('send')}</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default MessagingScreen;
