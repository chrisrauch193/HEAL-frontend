// src/styles/chatStyles.ts
import { StyleSheet } from "react-native";
import { colors, spacing, fonts } from './globalStyles';

export const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.medium,
    },
    header: {
        height: 70,
        width: "100%",
        padding: spacing.medium,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    heading: {
        fontSize: fonts.title,
        fontWeight: "bold",
        color: colors.primary,
    },
    listContainer: {
        paddingHorizontal: spacing.small,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontWeight: "bold",
        fontSize: fonts.title,
        color: colors.text,
    },
    chat: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        height: 80,
        marginVertical: spacing.small,
        paddingHorizontal: spacing.medium,
        borderRadius: 10,
    },
    avatar: {
        marginRight: spacing.medium,
    },
    rightContainer: {
        flex: 1,
        justifyContent: "center",
    },
    username: {
        fontSize: fonts.text,
        fontWeight: "bold",
    },
    message: {
        fontSize: fonts.small,
        color: colors.grey,
    },
});
