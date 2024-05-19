// src/styles/UserProfileFormStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { spacing, colors, fonts } from '@styles/GlobalStyles';

export const UserProfileFormStyles = StyleSheet.create({
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
    label: {
        fontSize: fonts.text,
        color: colors.text,
        marginBottom: spacing.small,
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
});

export default UserProfileFormStyles;
