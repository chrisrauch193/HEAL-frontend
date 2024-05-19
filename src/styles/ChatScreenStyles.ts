// src/styles/ChatScreenStyles.ts
import { StyleSheet } from 'react-native';
import GlobalStyles, { spacing } from '@styles/GlobalStyles';

export const ChatScreenStyles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
    },
    header: {
        ...GlobalStyles.container,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.small,
    },
    listContainer: {
        flex: 1,
    },
    emptyContainer: {
        ...GlobalStyles.container,
        justifyContent: 'center',
    },
    emptyText: {
        ...GlobalStyles.text,
        fontWeight: 'bold',
    },
});

export default ChatScreenStyles;
