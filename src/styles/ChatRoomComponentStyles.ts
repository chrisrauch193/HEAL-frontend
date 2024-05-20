// src/styles/ChatRoomComponentStyles.ts
import { StyleSheet, Platform } from "react-native";
import { spacing, colors, fonts } from './GlobalStyles';

export const ChatRoomComponentStyles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            web: {
                overflowY: 'auto',
                height: '100vh',
            },
        }),
    },
    listItem: {
        padding: spacing.small,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        backgroundColor: colors.background,
    },
    text: {
        fontSize: fonts.text,
        color: colors.text,
    },
});

export default ChatRoomComponentStyles;