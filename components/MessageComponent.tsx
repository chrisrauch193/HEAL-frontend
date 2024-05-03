// components/MessageComponent.tsx
import React from 'react';
import { View, Text } from "react-native";
import HighlightedText from './HighlightedText';
import messageStyles from '../styles/messageStyles'; // Ensure the path is correct

const MessageComponent = ({ item, current_user_id }) => {
    const isCurrentUser = item.sender_user_id === current_user_id;
    const messageText = item.content.text; // Default text
    const medicalTerms = item.content.metadata?.medical_terms?.map(term => term.name) || [];

    // Function to format timestamp using the user's local timezone
    const formatTime = (timestamp) => {
        // Using the user's default locale and timezone
        return new Date(timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <View style={isCurrentUser ? messageStyles.myMessage : messageStyles.otherMessage}>
            <View style={[messageStyles.messageContent, isCurrentUser ? messageStyles.myMessageContent : messageStyles.otherMessageContent]}>
                <HighlightedText
                    text={messageText}
                    medicalTerms={medicalTerms}
                    style={messageStyles.medicalTermHighlight}
                />
                <Text style={messageStyles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
        </View>
    );
};

export default MessageComponent;
