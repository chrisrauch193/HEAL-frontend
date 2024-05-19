// src/components/MedicalTermDetailsModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MedicalTerm } from '@types/medicalTypes';
import { medicalTermDetailsStyles } from "@styles/medicalTermDetailsStyles";

import { useTranslation } from 'react-i18next';

interface TermDetailsModalProps {
    visible: boolean;
    term: MedicalTerm | null;
    onClose: () => void;
}

const MedicalTermDetailsModal: React.FC<TermDetailsModalProps> = ({ visible, term, onClose }) => {
    const { t } = useTranslation();
    if (!term) {
        return null;
    }

    const handleLinkPress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={medicalTermDetailsStyles.centeredView}>
                <View style={medicalTermDetailsStyles.modalView}>
                    <Text style={medicalTermDetailsStyles.termName}>{term.name}</Text>
                    <Text style={medicalTermDetailsStyles.description}>{term.description}</Text>
                    {term.medicalTermLinks.map((link, index) => (
                        <TouchableOpacity key={index} onPress={() => handleLinkPress(link)}>
                            <Text style={medicalTermDetailsStyles.link}>{link}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={medicalTermDetailsStyles.closeButton} onPress={onClose}>
                        <Text style={medicalTermDetailsStyles.closeButtonText}>{t("close")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};



export default MedicalTermDetailsModal;