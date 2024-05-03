// styles/messagingStyles.ts
import { StyleSheet } from "react-native";

export const messagingStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#ffffff", // Assuming a white background for the chat screen
    },
    inputContainer: {
        flexDirection: "row",
        padding: 15,
        borderTopWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#f5f5f5",
    },
    input: {
        flex: 1,
        minHeight: 40, // Minimum height
        maxHeight: 120, // Maximum height as needed
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
        backgroundColor: "#ffffff",
    },
    buttonContainer: {
        width: 50,
        height: 40,
        backgroundColor: "#007BFF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
    },
});
