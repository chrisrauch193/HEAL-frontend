// src/styles/ChatComponentStyles.ts
import { StyleSheet } from "react-native";
import GlobalStyles, { spacing, fonts, colors } from './GlobalStyles';

export const ChatComponentStyles = StyleSheet.create({
    chat: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.medium,
        borderRadius: 10,
        marginVertical: spacing.small,
    },
    rightContainer: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: spacing.medium,
    },
    username: {
        fontSize: fonts.text,
        fontWeight: "bold",
        color: colors.text,
    },
    message: {
        fontSize: fonts.small,
        color: colors.grey,
    },
});
