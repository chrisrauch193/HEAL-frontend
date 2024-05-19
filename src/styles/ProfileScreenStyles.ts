// src/styles/ProfileScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles, { spacing, colors, fonts } from '@styles/GlobalStyles';

const ProfileScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
        ...(Platform.OS === 'web' && {
            height: '100vh',
            overflowY: 'auto',
        }),
    },
    name: {
        fontWeight: 'bold',
        ...fonts.title,
        color: colors.text,
        marginBottom: spacing.medium,
    },
    details: {
        fontSize: fonts.text,
        color: colors.text,
        marginBottom: spacing.small,
    },
    button: {
        ...GlobalStyles.button,
        marginBottom: spacing.small, // Add margin bottom to separate buttons
    },
    buttonSecondary: {
        ...GlobalStyles.buttonSecondary,
    },
    buttonText: {
        ...GlobalStyles.buttonText,
    },
});

export default ProfileScreenStyles;
