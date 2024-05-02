import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF1FF",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        width: "100%",
    },
    heading: {
        fontSize: 26,
        marginBottom: 10,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        width: "90%",
        padding: 8,
        borderRadius: 2,
    },
    button: {
        backgroundColor: "green",
        padding: 12,
        marginVertical: 10,
        width: "60%",
        borderRadius: 50,
        elevation: 1,
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "600",
    },
});
