import React from 'react';
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../utils/styles";
import HighlightedText from './HighlightedText';

// Define the type for the message item and the user
interface MessageComponentProps {
    item: {
        message_id: string;
        room_id: string;
        sender_user_id: string;
        timestamp: string;
        content: {
            text: string;
            metadata: {
                translations: {
                    en: string;
                };
                medical_terms: {
                    medical_term_id: string;
                    medical_term_type: string;
                    medical_term_context: string;
                    name: string;
                    description: string;
                    medical_term_links: string[];
                }[];
            };
        };
    };
    current_user_id: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ item, current_user_id }) => {
    const isCurrentUser = item.sender_user_id === current_user_id;
    const messageText = isCurrentUser ? item.content.text : item.content.metadata.translations.en;

    // Function to highlight medical terms in the message text
    const highlightMedicalTerms = (text: string) => {
        // Extract medical term names from metadata
        const medicalTerms = item.content.metadata.medical_terms.map(term => term.name.toLowerCase());
    
        // Return the text with medical terms highlighted
        return (
            <HighlightedText
                text={text}
                medicalTerms={medicalTerms}
                style={styles.medicalTerm}
            />
        );
    };

    return (
        <View>
            <View
                style={
                    isCurrentUser
                        ? [styles.mmessageWrapper, { alignItems: "flex-end" }]
                        : styles.mmessageWrapper
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                        name="person-circle-outline"
                        size={30}
                        color="black"
                        style={styles.mavatar}
                    />
                    <View
                        style={
                            isCurrentUser
                                ? [styles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
                                : styles.mmessage
                        }
                    >
                        {/* Render the message text with highlighted medical terms */}
                        {highlightMedicalTerms(messageText)}
                    </View>
                </View>
                <Text style={{ marginLeft: 40 }}>{item.timestamp}</Text>
            </View>
        </View>
    );
};

export default MessageComponent;
