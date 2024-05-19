// src/styles/LoginScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles, { spacing, colors, fonts } from '@src/styles/GlobalStyles';

export const LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
        ...(Platform.OS === 'web' && {
            height: '100vh',
            overflowY: 'auto',
        }),
    },
    heading: {
        fontSize: fonts.title,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
    },
    input: {
        ...GlobalStyles.input,
        ...(Platform.OS === 'web' && {
            width: '100%',
        }),
    },
    button: {
        ...GlobalStyles.button,
    },
    buttonText: {
        ...GlobalStyles.buttonText,
    },
    registerLink: {
        color: colors.secondary,
        marginTop: spacing.small,
        textAlign: 'center',
    },
});

export default LoginScreenStyles;
