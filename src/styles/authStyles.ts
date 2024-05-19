// src/styles/authStyles.ts
import { StyleSheet } from "react-native";
import { colors, spacing, fonts } from '@src/globalStyles';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.large,
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
        width: "90%",
        marginBottom: spacing.small,
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        width: "60%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: spacing.medium,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    linkText: {
        color: colors.secondary,
        marginTop: spacing.small,
    },
});
