// src/styles/medicalTermDetailsStyles.ts
import { StyleSheet } from "react-native";

export const medicalTermDetailsStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    termName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        color: '#00796b',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left',
    },
    link: {
        color: '#00796b',
        textDecorationLine: 'underline',
        textAlign: 'left',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#00796b',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});