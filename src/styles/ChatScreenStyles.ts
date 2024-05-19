// src/styles/ChatScreenStyles.ts
import { StyleSheet } from 'react-native';
import GlobalStyles, { spacing } from '@styles/GlobalStyles';

export const ChatScreenStyles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        justifyContent: 'flex-start', // Ensure content starts at the top
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
    },
    listContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Ensure the list starts at the top
        paddingHorizontal: spacing.medium,
    },
    emptyContainer: {
        ...GlobalStyles.container,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        ...GlobalStyles.text,
        fontWeight: 'bold',
    },
    iconButton: {
        padding: spacing.small,
    },
});

export default ChatScreenStyles;
