import React, { useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/slices/chatSlice';  // Assuming this action exists
import { RootState } from '../store';
import Modal from "../components/Modal";
import ChatComponent from "../components/ChatComponent";
import { chatStyles } from "../styles/chatStyles";

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const { rooms, status } = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        dispatch(fetchRooms());  // Fetch rooms on component mount
    }, [dispatch]);

    const handleCreateGroup = () => {/* Implement group creation logic */};

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return <Text>Error fetching rooms</Text>;
    }

    return (
        <SafeAreaView style={chatStyles.container}>
            <View style={chatStyles.header}>
                <Text style={chatStyles.heading}>Chats</Text>
                <Pressable onPress={handleCreateGroup}>
                    <Feather name="edit" size={24} color="green" />
                </Pressable>
            </View>
            <View style={chatStyles.listContainer}>
                {rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <ChatComponent item={item} />}
                        keyExtractor={(item) => item.room_id.toString()}
                    />
                ) : (
                    <View style={chatStyles.emptyContainer}>
                        <Text style={chatStyles.emptyText}>No rooms created!</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Chat;
