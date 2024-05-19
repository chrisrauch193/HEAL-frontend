// src/components/MessageComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import HighlightedTextComponent from '@components/HighlightedTextComponent';
import { MessageComponentStyles } from "@styles/MessageComponentStyles";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MedicalTerm } from '@types/medicalTypes';

interface MessageComponentProps {
    item: {
        messageId: string;
        roomId: string;
        senderUserId: string;
        timestamp: string;
        content: {
            text: string;
            metadata: {
                translation: string;
                medicalTerms: { id: string; synonym: string; termInfo: MedicalTerm }[];
            };
        };
    };
    currentUserId: string;
    userLanguage: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ item, currentUserId, userLanguage }) => {
    const isCurrentUser = item.senderUserId === currentUserId;
    const translation = item.content.metadata.translation;
    const messageText = isCurrentUser ? item.content.text : translation || item.content.text;
    const medicalTerms = item.content.metadata.medicalTerms.map(term => ({
        id: term.id,
        synonym: term.synonym,
        ...term.termInfo
    }));

    const navigation = useNavigation();

    const handleProfileNavigation = (userId: string) => {
        navigation.navigate('ProfileScreen', { viewUserId: userId });
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <View style={isCurrentUser ? MessageComponentStyles.myMessage : MessageComponentStyles.otherMessage}>
            {!isCurrentUser && (
                <TouchableOpacity onPress={() => handleProfileNavigation(item.senderUserId)} style={MessageComponentStyles.profileIcon}>
                    <FontAwesome name="user-circle" size={24} color="blue" />
                </TouchableOpacity>
            )}
            <View style={[MessageComponentStyles.messageContent, isCurrentUser ? MessageComponentStyles.myMessageContent : MessageComponentStyles.otherMessageContent]}>
                <HighlightedTextComponent
                    text={messageText}
                    medicalTerms={medicalTerms}
                />
                <Text style={MessageComponentStyles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
        </View>
    );
};

export default MessageComponent;
