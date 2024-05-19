// src/components/ModalComponent.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { ModalComponentStyles } from "@styles/ModalComponentStyles";
import socket from "@src/api/socket";
import { useTranslation } from 'react-i18next';

interface ModalProps {
    setVisible: (visible: boolean) => void;
}

const ModalComponent: React.FC<ModalProps> = ({ setVisible }) => {
    const { t } = useTranslation();
    const [groupName, setGroupName] = useState<string>("");

    const closeModal = () => setVisible(false);
    const handleCreateRoom = () => {
        if (groupName.trim()) {
            socket.emit("createRoom", groupName);
            closeModal();
        } else {
            console.log("Group name is required.");
        }
    };

    return (
        <View style={ModalComponentStyles.modalContainer}>
            <Text style={ModalComponentStyles.modalsubheading}>{t('enterYourGroupName')}</Text>
            <TextInput
                style={ModalComponentStyles.modalinput}
                placeholder={t('groupName')}
                value={groupName}
                onChangeText={setGroupName}
            />
            <View style={ModalComponentStyles.modalbuttonContainer}>
                <Pressable style={ModalComponentStyles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={ModalComponentStyles.modaltext}>{t('create')}</Text>
                </Pressable>
                <Pressable
                    style={[ModalComponentStyles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={ModalComponentStyles.modaltext}>{t('cancel')}</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ModalComponent;