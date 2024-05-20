// src/screens/ChatScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchRooms } from '../store/slices/chatSlice';
import { RootState } from '../store';
import ChatComponent from '../components/ChatComponent';
import { ChatScreenStyles } from '../styles/ChatScreenStyles';
import { createChatRoom } from '../services/chatService';
import { useTranslation } from 'react-i18next';
import { addOptimisticRoom, fetchStep2Rooms } from '../store/slices/chatSlice'

const ChatScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { rooms, status } = useSelector((state: RootState) => state.chat);
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);

    const roomsArray = rooms || [];

    useEffect(() => {
        if (currentUserProfile?.type === 'DOCTOR') {
            dispatch(fetchStep2Rooms());
        } else {
            dispatch(fetchRooms(currentUserProfile?.userId));
        }
    }, [dispatch, currentUserProfile]);

    const handleCreateGroup = async () => {
        try {
            const newRoom = await createChatRoom();
            dispatch(addOptimisticRoom(newRoom));
        } catch (error) {
            console.error('Failed to create new chat room:', error);
        }
    };

    const handleNavigateProfile = () => {
        //console.log("pressed")
        //console.log("currentUserProfile:", currentUserProfile);
        if (currentUserProfile && currentUserProfile.userId) {
            console.log("yes")
            navigation.navigate('ProfileScreen', { viewUserId: currentUserProfile.userId });
        }
    };

    const handleNavigateStep1 = () => {
        navigation.navigate('Step1RoomsScreen');
    };

    const handleNavigateStep3 = () => {
        navigation.navigate('Step3RoomsScreen');
    };

    if (status === 'loading') {
        //console.log("loading now")
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return <Text style={ChatScreenStyles.emptyText}>{t('errorFetchingRooms')}</Text>;
    }

    const renderDoctorView = () => (
        <>
            <View style={ChatScreenStyles.listContainer}>
                {roomsArray.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <ChatComponent item={item} />}
                        keyExtractor={(item) => item.roomId}
                    />
                ) : (
                    <View style={ChatScreenStyles.emptyContainer}>
                        <Text style={ChatScreenStyles.emptyText}>{t('noRoomsCreated')}</Text>
                    </View>
                )}
            </View>
            <View style={ChatScreenStyles.navBar}>
                <Pressable onPress={handleNavigateStep1} style={ChatScreenStyles.navButton}>
                    <Text style={ChatScreenStyles.navButtonText}>Step 1</Text>
                </Pressable>
                <Pressable onPress={() => dispatch(fetchStep2Rooms())} style={ChatScreenStyles.navButton}>
                    <Text style={ChatScreenStyles.navButtonText}>Step 2</Text>
                </Pressable>
                <Pressable onPress={handleNavigateStep3} style={ChatScreenStyles.navButton}>
                    <Text style={ChatScreenStyles.navButtonText}>Step 3</Text>
                </Pressable>
            </View>
        </>
    );

    const renderPatientView = () => (
        <View style={ChatScreenStyles.listContainer}>
            {rooms.length > 0 ? (
                <FlatList
                    data={rooms}
                    renderItem={({ item }) => <ChatComponent item={item} />}
                    keyExtractor={(item) => item.roomId}
                />
            ) : (
                <View style={ChatScreenStyles.emptyContainer}>
                    <Text style={ChatScreenStyles.emptyText}>{t('noRoomsCreated')}</Text>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={ChatScreenStyles.container}>
            <View style={ChatScreenStyles.header}>
                <Pressable onPress={handleNavigateProfile} style={ChatScreenStyles.iconButton}>
                    <FontAwesome name="user" size={24} color="blue" />
                </Pressable>
                {currentUserProfile?.type === 'PATIENT' && (
                    <Pressable onPress={handleCreateGroup} style={ChatScreenStyles.iconButton}>
                        <Feather name="edit" size={24} color="green" />
                    </Pressable>
                )}
            </View>
            {currentUserProfile?.type === 'DOCTOR' ? renderDoctorView() : renderPatientView()}
        </SafeAreaView>
    );
};

export default ChatScreen;
