// src/components/ChatRoomComponent.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { receivedMessage, fetchMessages } from '../store/slices/chatSlice';
import { RootState } from '../store';
import socket from '../api/socket';
import { ChatMessage } from '../types/chatTypes';
import { ChatRoomComponentStyles } from '../styles/ChatRoomComponentStyles';

const ChatRoomComponent = ({ roomId }: { roomId: string }) => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.chat.messages[roomId] || []);

    useEffect(() => {
        dispatch(fetchMessages(roomId));

        const handleNewMessage = (message: ChatMessage) => {
            if (message.roomId === roomId) {
                dispatch(receivedMessage({ roomId, message }));
            }
        };

        socket.on('newMessage', handleNewMessage);
        return () => socket.off('newMessage', handleNewMessage);
    }, [dispatch, roomId]);

    const renderItem = ({ item }: { item: ChatMessage }) => (
        <Text style={ChatRoomComponentStyles.text}>{item.content.text}</Text>
    );

    return (
        <View style={ChatRoomComponentStyles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.messageId.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default ChatRoomComponent;