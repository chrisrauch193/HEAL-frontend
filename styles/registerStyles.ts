import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F8",
        padding: 20,
    },
    heading: {
        fontSize: 26,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '90%',
    },
    button: {
        backgroundColor: 'blue',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    pickerStyle: {
        height: 50,
        marginBottom: 20,
        width: '90%',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
