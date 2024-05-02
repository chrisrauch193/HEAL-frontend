import React, { useState, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/slices/chatSlice';  // Ensure you have this action in chatSlice
import { RootState } from '../store';
import Modal from "../components/Modal";
import ChatComponent from "../components/ChatComponent";
import { chatStyles } from "../styles/chatStyles";
import { UserProfile } from '../types/userTypes'; // Import UserProfile type

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector((state: RootState) => state.chat);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchRooms());  // Fetch rooms on component mount
    }, [dispatch]);

    const handleCreateGroup = () => setVisible(true);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;  // Loading indicator
    if (error) return <Text>Error fetching rooms: {error}</Text>;  // Error message

    return (
        <SafeAreaView style={chatStyles.container}>
            <View style={chatStyles.header}>
                <Text style={chatStyles.heading}>Chats</Text>
                <Pressable onPress={handleCreateGroup}>
                    <Feather name='edit' size={24} color='green' />
                </Pressable>
            </View>

            <View style={chatStyles.listContainer}>
                {rooms && rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <Text>{item.room}</Text>}
                        // renderItem={({ item }) => <ChatComponent room={item} />}
                        keyExtractor={(item) => item.room_id.toString()}
                    />
                ) : (
                    <View style={chatStyles.emptyContainer}>
                        <Text style={chatStyles.emptyText}>No rooms created!</Text>
                        <Text>Click the icon above to create a Chat room</Text>
                    </View>
                )}
            </View>
            {visible && <Modal setVisible={setVisible} />}
        </SafeAreaView>
    );
};

export default Chat;
