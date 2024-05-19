// src/styles/GlobalStyles.ts
import { StyleSheet, Platform } from 'react-native';

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

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.medium,
        ...(Platform.OS === 'web' && {
            height: '100vh',
            overflowY: 'auto',
        }),
    },
    text: {
        color: colors.text,
        fontSize: fonts.text,
    },
    heading: {
        fontSize: fonts.title,
        fontWeight: 'bold',
        color: colors.primary,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginVertical: spacing.small,
    },
    buttonText: {
        color: colors.white,
        fontSize: fonts.text,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 4,
        padding: spacing.small,
        marginBottom: spacing.small,
        width: '100%',
    },
});

export default GlobalStyles;
