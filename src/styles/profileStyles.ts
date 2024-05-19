// src/styles/profileStyles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '@styles/globalStyles';

export const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
    },
    name: {
        fontSize: fonts.title,
        fontWeight: 'bold',
        color: colors.text,
    },
    details: {
        fontSize: fonts.text,
        color: colors.grey,
        marginBottom: spacing.medium,
    },
    editButton: {
        backgroundColor: colors.primary, // Use primary color for the edit button
        padding: spacing.small,
        borderRadius: spacing.small,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.medium,
    },
    logoutButton: {
        backgroundColor: colors.secondary, // Red for the logout button
        padding: spacing.small,
        borderRadius: spacing.small,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.medium,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
