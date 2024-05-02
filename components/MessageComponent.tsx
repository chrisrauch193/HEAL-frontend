import React from 'react';
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { messagingStyles } from "../styles/messagingStyles";
import HighlightedText from './HighlightedText';

const MessageComponent: React.FC<MessageComponentProps> = ({ item, current_user_id }) => {
    const isCurrentUser = item.sender_user_id === current_user_id;
    const messageText = isCurrentUser ? item.content.text : item.content.metadata.translations.en;

    return (
        <View>
            <View
                style={
                    isCurrentUser
                        ? [messagingStyles.messageWrapper, { alignItems: "flex-end" }]
                        : messagingStyles.messageWrapper
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                        name="person-circle-outline"
                        size={30}
                        color="black"
                        style={messagingStyles.avatar}
                    />
                    <View
                        style={
                            isCurrentUser
                                ? [messagingStyles.message, { backgroundColor: "rgb(194, 243, 194)" }]
                                : messagingStyles.message
                        }
                    >
                        <HighlightedText
                            text={messageText}
                            medicalTerms={item.content.metadata.medical_terms.map(term => term.name.toLowerCase())}
                            style={messagingStyles.medicalTerm}
                        />
                    </View>
                </View>
                <Text style={{ marginLeft: 40 }}>{item.timestamp}</Text>
            </View>
        </View>
    );
};

export default MessageComponent;
