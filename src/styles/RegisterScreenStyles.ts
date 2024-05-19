// src/styles/RegisterScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { spacing, colors, fonts } from '@src/styles/GlobalStyles';

export const RegisterScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.medium,
        backgroundColor: colors.background,
        ...(Platform.OS === 'web' && {
            height: '100vh', // This sets the height to the full viewport height on web
            overflow: 'auto', // This allows the container to scroll on web
        }),
    },
    heading: {
        fontSize: fonts.title,
        color: colors.text,
        marginBottom: spacing.medium,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.grey,
        padding: spacing.small,
        width: '90%',
        marginBottom: spacing.small,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: 20,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.medium,
    },
    buttonText: {
        color: colors.white,
        fontWeight: '600',
    },
    linkText: {
        color: colors.secondary,
        marginTop: spacing.small,
    }
});

export default RegisterScreenStyles;
