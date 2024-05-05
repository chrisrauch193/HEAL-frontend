// components/MessageComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import HighlightedTextComponent from './HighlightedTextComponent'
import { messageStyles } from "../styles/messageStyles";
import { highlightedTextStyles } from "../styles/highlightedTextStyles";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure FontAwesome is imported

const MessageComponent = ({ item, currentUserId, userLanguage }) => {
    const isCurrentUser = item.senderUserId === currentUserId;
    const translations = item.content.metadata.translations;
    // Determine the message text based on user's language or default to English if unavailable
    const messageText = isCurrentUser ? item.content.text : translations[userLanguage] || translations['en'] || item.content.text;
    const medicalTerms = item.content.metadata?.medicalTerms || [];

    const navigation = useNavigation();

    const handleProfileNavigation = (userId) => {
        navigation.navigate('ProfileScreen', { viewUserId: userId });
    };


    // Function to format timestamp using the user's local timezone
    const formatTime = (timestamp) => {
        // Using the user's default locale and timezone
        return new Date(timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <View style={isCurrentUser ? messageStyles.myMessage : messageStyles.otherMessage}>
            <TouchableOpacity onPress={() => handleProfileNavigation(item.senderUserId)} style={messageStyles.profileIcon}>
                <FontAwesome name="user-circle" size={24} color="blue" />
            </TouchableOpacity>
            <View style={[messageStyles.messageContent, isCurrentUser ? messageStyles.myMessageContent : messageStyles.otherMessageContent]}>
                <HighlightedTextComponent
                    text={messageText}
                    medicalTerms={medicalTerms}
                    style={highlightedTextStyles.medicalTermHighlight}
                />
                <Text style={messageStyles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
        </View>
    );
};

export default MessageComponent;
