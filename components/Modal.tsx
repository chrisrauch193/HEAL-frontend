import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { modalStyles } from "../styles/modalStyles";
import socket from "../utils/socket";

const Modal: React.FC<ModalProps> = ({ setVisible }) => {
    const [groupName, setGroupName] = useState<string>("");

    const closeModal = () => setVisible(false);
    const handleCreateRoom = () => {
        if (groupName.trim()) {
            socket.emit("create_room", groupName);
            closeModal();
        } else {
            console.log("Group name is required.");
        }
    };

    return (
        <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalsubheading}>Enter your Group name</Text>
            <TextInput
                style={modalStyles.modalinput}
                placeholder="Group name"
                value={groupName}
                onChangeText={setGroupName}
            />
            <View style={modalStyles.modalbuttonContainer}>
                <Pressable style={modalStyles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={modalStyles.modaltext}>CREATE</Text>
                </Pressable>
                <Pressable
                    style={[modalStyles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={modalStyles.modaltext}>CANCEL</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Modal;
