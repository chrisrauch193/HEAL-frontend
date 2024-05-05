// src/styles/chatStyles.ts
import { StyleSheet } from "react-native";
import { colors, spacing, fonts } from './globalStyles';

export const messageStyles = StyleSheet.create({
    myMessage: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: spacing.small,
        marginVertical: spacing.small,
    },
    otherMessage: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: spacing.small,
        marginVertical: spacing.small,
    },
    messageContent: {
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.small,
        borderRadius: 15,
        backgroundColor: colors.white,
        maxWidth: "80%",
        flexDirection: "column",
    },
    myMessageContent: {
        backgroundColor: colors.lightGreen,
    },
    otherMessageContent: {
        backgroundColor: colors.lightGray,
    },
    timestamp: {
        fontSize: fonts.small,
        color: colors.grey,
        alignSelf: "flex-end",
        paddingTop: spacing.small,
    },
    profileIcon: {
        paddingRight: 10, // Padding to ensure touch area is adequate
    },
});
