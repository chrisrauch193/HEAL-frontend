import React, { useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageComponent from "../component/MessageComponent";
import { styles } from "../utils/styles";

// Define types for navigation and route props
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

interface MessagingProps {
    route: RouteProp<RootStackParamList, 'Messaging'>;
    navigation: StackNavigationProp<RootStackParamList, 'Messaging'>;
}

interface Message {
    id: string;
    text: string;
    time: string;
    user: string;
}

const Messaging: React.FC<MessagingProps> = ({ route, navigation }) => {
    const [chatMessages, setChatMessages] = useState<Message[]>([
        {
            id: "1",
            text: "You have COVID",
            time: "07:50",
            user: "Doctor",
        },
        {
            id: "2",
            text: "SAD",
            time: "08:50",
            user: "Patient",
        },
    ]);
    const [message, setMessage] = useState<string>("");
    const [user, setUser] = useState<string>("");

    const { name, id } = route.params as { name: string; id: string };

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

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        getUsername();
    }, [navigation, name]);

    const handleNewMessage = () => {
        const hour = new Date().getHours().toString().padStart(2, '0');
        const mins = new Date().getMinutes().toString().padStart(2, '0');

        console.log({
            message,
            user,
            timestamp: { hour, mins },
        });
    };

    return (
        <View style={styles.messagingscreen}>
            <FlatList
                data={chatMessages}
                renderItem={({ item }) => <MessageComponent item={item} user={user} />}
                keyExtractor={(item) => item.id}
                style={{ flex: 1 }}
            />
            <View style={styles.messaginginputContainer}>
                <TextInput
                    style={styles.messaginginput}
                    placeholder="Type your message here..."
                    value={message}
                    onChangeText={setMessage}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>SEND</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Messaging;
