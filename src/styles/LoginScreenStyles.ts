// src/styles/LoginScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { spacing, colors, fonts } from '@styles/GlobalStyles';

export const LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
        ...(Platform.OS === 'web' && {
            height: '100vh', // Full viewport height on web
            overflowY: 'auto', // Allow scrolling on web
        }),
    },
    heading: {
        fontSize: fonts.title,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 4,
        padding: spacing.small,
        fontSize: fonts.text,
        marginBottom: spacing.medium,
        color: colors.text,
        backgroundColor: colors.white,
        ...(Platform.OS === 'web' && {
            width: '100%', // Full width inputs on web
        }),
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        fontSize: fonts.text,
        color: colors.white,
        fontWeight: 'bold',
        marginTop: spacing.medium,
    },
    buttonText: {
        color: colors.white,
        fontSize: fonts.text,
        fontWeight: 'bold',
    },
    registerLink: {
        color: colors.secondary,
        marginTop: spacing.small,
        textAlign: 'center',
    },
});

export default LoginScreenStyles;
