// components/MessageComponent.tsx
import React from 'react';
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { messagingStyles } from "../styles/messagingStyles";
import HighlightedText from './HighlightedText';

interface MessageComponentProps {
    item: any; // Use your message type
    current_user_id: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ item, current_user_id }) => {
    const isCurrentUser = item.sender_user_id === current_user_id;
    const messageText = item.content.text; // Default text
    const medicalTerms = item.content.metadata.medical_terms.map(term => term.name);

    return (
        <View style={isCurrentUser ? messagingStyles.myMessage : messagingStyles.otherMessage}>
            <Ionicons name="person-circle-outline" size={30} color="black" style={messagingStyles.avatar} />
            <HighlightedText
                text={messageText}
                medicalTerms={medicalTerms}
                style={messagingStyles.medicalTermHighlight}
            />
            <Text style={messagingStyles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
        </View>
    );
};

export default MessageComponent;
