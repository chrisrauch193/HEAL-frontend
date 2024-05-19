// src/components/MedicalTermDetailsModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { MedicalTermDetailsModalStyles } from '@styles/MedicalTermDetailsModalStyles';
import { MedicalTerm } from '@types/medicalTypes';
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
            <View style={MedicalTermDetailsModalStyles.centeredView}>
                <View style={MedicalTermDetailsModalStyles.modalView}>
                    <Text style={MedicalTermDetailsModalStyles.termName}>{term.name}</Text>
                    <Text style={MedicalTermDetailsModalStyles.description}>{term.description}</Text>
                    {term.medicalTermLinks.map((link, index) => (
                        <TouchableOpacity key={index} onPress={() => handleLinkPress(link)}>
                            <Text style={MedicalTermDetailsModalStyles.link}>{link}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={MedicalTermDetailsModalStyles.closeButton} onPress={onClose}>
                        <Text style={MedicalTermDetailsModalStyles.closeButtonText}>{t("close")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};



export default MedicalTermDetailsModal;