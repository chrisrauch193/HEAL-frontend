// /components/ModalComponent.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { modalStyles } from "../styles/modalStyles";
import socket from "../api/socket";

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
        <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalsubheading}>{t('enterYourGroupName')}</Text>
            <TextInput
                style={modalStyles.modalinput}
                placeholder={t('groupName')}
                value={groupName}
                onChangeText={setGroupName}
            />
            <View style={modalStyles.modalbuttonContainer}>
                <Pressable style={modalStyles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={modalStyles.modaltext}>{t('create')}</Text>
                </Pressable>
                <Pressable
                    style={[modalStyles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={modalStyles.modaltext}>{t('cancel')}</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ModalComponent;
