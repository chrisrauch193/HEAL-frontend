// src/screens/ChatScreen.tsx
import React, { useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchRooms } from '../store/slices/chatSlice';
import { RootState } from '../store';
import ChatComponent from "../components/ChatComponent";
import { ChatScreenStyles } from "../styles/ChatScreenStyles";
import ModalComponent from "../components/ModalComponent";

import { useTranslation } from 'react-i18next';

const ChatScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { rooms, status } = useSelector((state: RootState) => state.chat);
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);
    const [modalVisible, setModalVisible] = React.useState(false);

    useEffect(() => {
        dispatch(fetchRooms(currentUserProfile?.userId));
    }, [dispatch]);

    const handleCreateGroup = () => {
        setModalVisible(true);
    };

    const handleNavigateProfile = () => {
        if (currentUserProfile && currentUserProfile.userId) {
            navigation.navigate('ProfileScreen', { viewUserId: currentUserProfile.userId });
        }
    };

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return <Text style={ChatScreenStyles.emptyText}>{t('errorFetchingRooms')}</Text>;
    }

    return (
        <SafeAreaView style={ChatScreenStyles.container}>
            <View style={ChatScreenStyles.header}>
                <Pressable onPress={handleNavigateProfile} style={ChatScreenStyles.iconButton}>
                    <FontAwesome name="user" size={24} color="blue" />
                </Pressable>
                <Pressable onPress={handleCreateGroup} style={ChatScreenStyles.iconButton}>
                    <Feather name="edit" size={24} color="green" />
                </Pressable>
            </View>
            <View style={ChatScreenStyles.listContainer}>
                {rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <ChatComponent item={item} />}
                        keyExtractor={(item) => item.roomId.toString()}
                    />
                ) : (
                    <View style={ChatScreenStyles.emptyContainer}>
                        <Text style={ChatScreenStyles.emptyText}>{t('noRoomsCreated')}</Text>
                    </View>
                )}
            </View>
            {modalVisible && <ModalComponent setVisible={setModalVisible} />}
        </SafeAreaView>
    );
};

export default ChatScreen;
