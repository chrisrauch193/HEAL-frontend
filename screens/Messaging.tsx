// screens/Messaging.tsx
import React, { useEffect } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../store/slices/chatSlice';
import { RootState } from '../store';
import MessageComponent from "../components/MessageComponent";
import { messagingStyles } from "../styles/messagingStyles";

interface RouteParams {
    name: string;
    room_id: string;
}

const Messaging: React.FC<{ route: { params: RouteParams }, navigation: any }> = ({ route, navigation }) => {
    const { name, room_id } = route.params;
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.chat.messages[room_id] || []);
    const [messageText, setMessageText] = React.useState<string>("");

    useEffect(() => {
        dispatch(fetchMessages(room_id));
    }, [dispatch, room_id]);

    const handleSend = () => {
        // Implement the logic to send a message
        console.log("Sending message:", messageText);
        setMessageText(""); // Reset input after sending
    };

    return (
        <View style={messagingStyles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageComponent item={item} current_user_id="123" />} // Adjust current_user_id accordingly
                keyExtractor={(item) => item.message_id}
            />
            <View style={messagingStyles.inputContainer}>
                <TextInput
                    style={messagingStyles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type a message"
                />
                <Pressable style={messagingStyles.buttonContainer} onPress={handleSend}>
                    <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Messaging;
