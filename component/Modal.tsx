import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "../utils/styles";

// Define the type for props
interface ModalProps {
    setVisible: (visible: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setVisible }) => {
    const [groupName, setGroupName] = useState<string>(""); // Specify the type for state

    // Function that closes the Modal component
    const closeModal = () => setVisible(false);

    // Logs the group name to the console and closes the modal
    const handleCreateRoom = () => {
        console.log({ groupName });
        closeModal();
    };

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalsubheading}>Enter your Group name</Text>
            <TextInput
                style={styles.modalinput}
                placeholder="Group name"
                onChangeText={setGroupName}  // Directly set the state without wrapping
            />

            <View style={styles.modalbuttonContainer}>
                <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={styles.modaltext}>CREATE</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={styles.modaltext}>CANCEL</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Modal;
