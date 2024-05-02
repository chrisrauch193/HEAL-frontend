import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "../components/Modal";
import ChatComponent from "../components/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";

interface Room {
    id: string;
    name: string;
    messages: Array<{
        id: string;
        text: string;
        time: string;
        user: string;
    }>;
}

const Chat: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Room[]>([]);

    useLayoutEffect(() => {
        function fetchGroups() {
            fetch("http://192.168.0.16:4000/api")
                .then((res) => res.json())
                .then((data) => setRooms(data))
                .catch((err) => console.error(err));
        }
        fetchGroups();
    }, []);

    useEffect(() => {
        const handleRoomsUpdate = (rooms: Room[]) => {
            setRooms(rooms);
        };

        socket.on("rooms_list", handleRoomsUpdate);

        return () => {
            socket.off("rooms_list", handleRoomsUpdate);
        };
    }, []);

    const handleCreateGroup = () => setVisible(true);

    return (
        <SafeAreaView style={styles.chatscreen}>
            <View style={styles.chattopContainer}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Chats</Text>
                    <Pressable onPress={handleCreateGroup}>
                        <Feather name='edit' size={24} color='green' />
                    </Pressable>
                </View>
            </View>

            <View style={styles.chatlistContainer}>
                {rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <ChatComponent item={item} />}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Text style={styles.chatemptyText}>No rooms created!</Text>
                        <Text>Click the icon above to create a Chat room</Text>
                    </View>
                )}
            </View>
            {visible ? <Modal setVisible={setVisible} /> : null}
        </SafeAreaView>
    );
};

export default Chat;
