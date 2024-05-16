// components/MessageComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import HighlightedTextComponent from './HighlightedTextComponent'
import { messageStyles } from "../styles/messageStyles";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure FontAwesome is imported

const MessageComponent = ({ item, currentUserId, userLanguage }) => {
    const isCurrentUser = item.senderUserId === currentUserId;
    const translations = item.content.metadata.translations;
    const messageText = isCurrentUser ? item.content.text : translations[userLanguage] || translations['en'] || item.content.text;
    const medicalTerms = item.content.metadata?.medicalTerms || [];

    const navigation = useNavigation();

    const handleProfileNavigation = (userId) => {
        navigation.navigate('ProfileScreen', { viewUserId: userId });
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <View style={isCurrentUser ? messageStyles.myMessage : messageStyles.otherMessage}>
            {!isCurrentUser && (
                <TouchableOpacity onPress={() => handleProfileNavigation(item.senderUserId)} style={messageStyles.profileIcon}>
                    <FontAwesome name="user-circle" size={24} color="blue" />
                </TouchableOpacity>
            )}
            <View style={[messageStyles.messageContent, isCurrentUser ? messageStyles.myMessageContent : messageStyles.otherMessageContent]}>
                <HighlightedTextComponent
                    text={messageText}
                    medicalTerms={medicalTerms}
                />
                <Text style={messageStyles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
        </View>
    );
};

export default MessageComponent;
