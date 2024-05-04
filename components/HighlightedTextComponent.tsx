// src/components/HighlightedTextComponent.tsx
import React from 'react';
import { Text, TouchableOpacity, Modal, View, ScrollView, Linking } from 'react-native';
import { modalStyles } from '../styles/modalStyles';
import { MedicalTerm } from '../types/medicalTypes';

interface HighlightedTextProps {
    text: string;
    medicalTerms: MedicalTerm[];
    style: TextStyle;
}

const HighlightedTextComponent: React.FC<HighlightedTextProps> = ({ text, medicalTerms, style }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedTerm, setSelectedTerm] = React.useState<MedicalTerm | null>(null);

    const handlePressTerm = (medicalTerm: MedicalTerm) => {
        setSelectedTerm(medicalTerm);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTerm(null);
    };

    const handleLinkPress = (url: string) => {
        Linking.openURL(url);
    };

    const splitText = text.split(/\b([a-zA-Z0-9-]+)\b/g);

    return (
        <View>
            <Text>
                {splitText.map((word, index) => {
                    const medicalTerm = medicalTerms.find(term => word.toLowerCase() === term.name.toLowerCase());
                    return medicalTerm ? (
                        <TouchableOpacity key={index} onPress={() => handlePressTerm(medicalTerm)}>
                            <Text style={style}>{word}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text key={index}>{word}</Text>
                    );
                })}
            </Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={modalStyles.modalContainer}>
                    <ScrollView>
                        {selectedTerm && (
                            <View style={modalStyles.tooltipContainer}>
                                <Text style={modalStyles.modalsubheading}>{selectedTerm.name}</Text>
                                <Text>{selectedTerm.description}</Text>
                                {selectedTerm.medical_term_links.map((link, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleLinkPress(link)}>
                                        <Text style={modalStyles.link}>{link}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </ScrollView>
                    <TouchableOpacity onPress={closeModal} style={modalStyles.closeButton}>
                        <Text style={modalStyles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default HighlightedTextComponent;
