// src/styles/MessageComponentStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { spacing, fonts, colors } from '@src/styles/GlobalStyles';

export const MessageComponentStyles = StyleSheet.create({
    myMessage: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: spacing.small,
        marginVertical: spacing.small,
        paddingHorizontal: Platform.OS === 'web' ? spacing.medium : spacing.small, // Adjust padding for web
    },
    otherMessage: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: spacing.small,
        marginVertical: spacing.small,
        paddingHorizontal: Platform.OS === 'web' ? spacing.medium : spacing.small, // Adjust padding for web
    },
    messageContent: {
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.small,
        borderRadius: 15,
        backgroundColor: colors.white,
        maxWidth: "80%",
        flexDirection: "column",
        ...(Platform.OS === 'web' && { wordBreak: 'break-word' }), // Ensure word break for long texts on web
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
        paddingRight: spacing.small, // Padding to ensure touch area is adequate
    },
});

export default MessageComponentStyles;
