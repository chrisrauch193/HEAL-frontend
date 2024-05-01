import React from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import ChatComponent from "../component/ChatComponent";
import Modal from "../component/Modal";
import { styles } from "../utils/styles";

// Define types for the messages and rooms
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

const Chat: React.FC = () => {
    const [visible, setVisible] = useState(false);

    // Dummy list of rooms
    const rooms: Room[] = [
        {
            id: "1",
            name: "COIVD",
            messages: [
                {
                    id: "1a",
                    text: "You have COVID",
                    time: "07:50",
                    user: "Doctor",
                },
                {
                    id: "1b",
                    text: "SAD",
                    time: "08:50",
                    user: "Patient",
                },
            ],
        },
        {
            id: "2",
            name: "Long COVID",
            messages: [
                {
                    id: "2a",
                    text: "It's been a year and I still have COVID",
                    time: "12:50",
                    user: "Patient",
                },
                {
                    id: "2b",
                    text: "It must be long COVID",
                    time: "03:50",
                    user: "Doctor",
                },
            ],
        },
    ];

    return (
        <SafeAreaView style={styles.chatscreen}>
            <View style={styles.chattopContainer}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Chats</Text>
                    <Pressable onPress={() => setVisible(true)}>
                        <Feather name="edit" size={24} color="green" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.chatlistContainer}>
                {/* Other content like FlatList goes here */}
            </View>
            
            {/* Modal for creating new chat rooms */}
            {visible && <Modal setVisible={setVisible} />}
        </SafeAreaView>
    );
};

export default Chat;
