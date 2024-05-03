import React, { useEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialMessages, receivedMessage } from '../store/slices/chatSlice'; // Ensure receivedMessage is imported
import { RootState } from '../store';
import MessageComponent from "../components/MessageComponent";
import { messagingStyles } from "../styles/messagingStyles";
import socket from '../utils/socket';

const Messaging = ({ route, navigation }) => {
    const { room_id } = route.params;
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.profile);
    const messages = useSelector((state: RootState) => state.chat.messages[room_id] || []);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        dispatch(fetchInitialMessages(room_id));
        socket.emit('join_room', room_id);  // Ensure the user joins the room

        socket.on('new_message', (message) => {
            console.log(currentUser);
            console.log(messages);
            console.log(message);
            dispatch(receivedMessage({ roomId: room_id, message }));
        });

        return () => {
            socket.off('new_message');
        };
    }, [dispatch, room_id]);

    const handleSend = () => {
        if (messageText.trim() && currentUser && currentUser.user_id) {
            const messageData = {
                room_id,
                sender_user_id: currentUser.user_id, // Use the dynamically fetched user ID
                timestamp: new Date().toISOString(),
                content: {
                    text: messageText
                }
            };
            socket.emit('send_message', messageData);
            setMessageText("");
        }
    };

    return (
        <View style={messagingStyles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageComponent item={item} current_user_id={currentUser?.user_id || "unknown_user"} />}
                keyExtractor={(item) => item.message_id ? item.message_id.toString() : 'unknown_id'}
            />
            <View style={messagingStyles.inputContainer}>
                <TextInput
                    style={messagingStyles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type a message"
                />
                <Pressable style={messagingStyles.buttonContainer} onPress={handleSend}>
                    <Text style={messagingStyles.buttonText}>SEND</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Messaging;
