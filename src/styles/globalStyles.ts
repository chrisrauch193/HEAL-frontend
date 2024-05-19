// src/styles/globalStyles.ts
import { StyleSheet } from "react-native";

export const colors = {
    primary: '#007BFF',
    secondary: '#E14D2A',
    background: '#F7F7F7',
    text: '#333',
    white: '#FFF',
    grey: '#ccc',
    lightGreen: '#DCF8C6',
    lightGray: '#ECECEC',
};

export const spacing = {
    small: 8,
    medium: 16,
    large: 24,
};

export const fonts = {
    title: 24,
    text: 16,
    small: 12,
};

export const globalStyles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary, // Default color
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: '90%',
        borderRadius: 5,
    },
    buttonText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 16,
    }
});
