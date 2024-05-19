// src/styles/UserProfileFormStyles.ts
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles, { spacing, colors, fonts } from './GlobalStyles';

export const UserProfileFormStyles = StyleSheet.create({
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
    label: {
        fontSize: fonts.text,
        color: colors.text,
        marginBottom: spacing.small,
    },
    input: {
        ...GlobalStyles.input,
        ...(Platform.OS === 'web' && {
            width: '100%',
        }),
    },
    picker: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 4,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small,
        marginBottom: spacing.medium,
        color: colors.text,
        backgroundColor: colors.white,
    },
    button: {
        ...GlobalStyles.button,
    },
    buttonText: {
        ...GlobalStyles.buttonText,
    },
});

export default UserProfileFormStyles;
