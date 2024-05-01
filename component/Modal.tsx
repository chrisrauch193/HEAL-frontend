import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "../utils/styles";

// Import the Socket instance from the utils folder
import socket from "../utils/socket";

// Define the type for props
interface ModalProps {
    setVisible: (visible: boolean) => void;
}

interface Room {
    id: string;
    name: string;
    messages: Array<{
        id: string;
        text: string;
        time: string;
        user: string;
    }>;
}

const Modal: React.FC<ModalProps> = ({ setVisible }) => {
    const [groupName, setGroupName] = useState<string>("");
    const [rooms, setRooms] = useState<Room[]>([]);

    const closeModal = () => setVisible(false);

    const handleRoomsUpdate = (rooms: Room[]) => {
        setRooms(rooms);
    };

    const handleCreateRoom = () => {
        if (groupName.trim()) {
            // Sends a message containing the group name to the server
            socket.emit("create_room", groupName);
            socket.on("rooms_list", handleRoomsUpdate);
            closeModal();
        } else {
            console.log("Group name is required."); // Optionally, use an alert or a state to show an error message in the UI
        }
    };

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalsubheading}>Enter your Group name</Text>
            <TextInput
                style={styles.modalinput}
                placeholder="Group name"
                value={groupName}
                onChangeText={setGroupName}
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
