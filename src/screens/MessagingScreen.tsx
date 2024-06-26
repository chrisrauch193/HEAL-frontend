// src/screens/MessagingScreen.tsx
import React, { useEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable, ScrollView, Platform, Modal } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialMessages, fetchMoreMessages, receivedMessage, addOptimisticMessage } from '../store/slices/chatSlice';
import { RootState } from '../store';
import MessageComponent from "../components/MessageComponent";
import { MessagingScreenStyles } from "../styles/MessagingScreenStyles";
import initializeSocket from '../api/socket';
import { useTranslation } from 'react-i18next';
import DoctorSelectionModal from '../components/DoctorSelectionModal'; // Import the new modal component

const MessagingScreen = ({ route }) => {
    const { t } = useTranslation();
    const { roomId } = route.params;
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);
    const messages = useSelector((state: RootState) => state.chat.messages[roomId] || []);
    const [messageText, setMessageText] = useState("");
    const [socket, setSocket] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const setupChat = async () => {
            try {
                const socketInstance = await initializeSocket(roomId);
                setSocket(socketInstance);

                const messageListener = (message) => {
                    dispatch(receivedMessage({ roomId, message }));
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
            const messageToSend = {
                timestamp, 
                text: messageText
            };
            socket.emit('message', messageToSend);
            setMessageText("");
        }
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={MessagingScreenStyles.container}>
            {Platform.OS === 'web' ? (
                <ScrollView style={MessagingScreenStyles.scrollView}>
                    <View style={MessagingScreenStyles.messageListContainer}>
                        {messages.map(item => (
                            <MessageComponent key={item.messageId} item={item} currentUserId={currentUserProfile?.userId || "unknownUser"} userLanguage={currentUserProfile?.language || "en"} />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <FlatList
                    data={messages}
                    renderItem={({ item }) => <MessageComponent item={item} currentUserId={currentUserProfile?.userId || "unknownUser"} userLanguage={currentUserProfile?.language || "en"} />}
                    keyExtractor={(item) => item.messageId.toString()}
                    contentContainerStyle={MessagingScreenStyles.flatListContent}
                />
            )}
            <View style={MessagingScreenStyles.inputContainer}>
                <TextInput
                    style={MessagingScreenStyles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder={t('typeAMessage')}
                    multiline={true}
                />
                <Pressable style={MessagingScreenStyles.buttonContainer} onPress={handleSend}>
                    <Text style={MessagingScreenStyles.buttonText}>{t('send')}</Text>
                </Pressable>
                {currentUserProfile?.type === 'DOCTOR' && (
                    <Pressable style={MessagingScreenStyles.buttonContainer} onPress={handleOpenModal}>
                        <Text style={MessagingScreenStyles.buttonText}>{t('requestSecondOpinion')}</Text>
                    </Pressable>
                )}
            </View>
            <DoctorSelectionModal visible={modalVisible} onClose={handleCloseModal} roomId={roomId} />
        </View>
    );
};

export default MessagingScreen;
