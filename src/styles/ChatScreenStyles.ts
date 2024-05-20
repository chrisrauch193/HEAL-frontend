// src/styles/ChatScreenStyles.ts
import { StyleSheet } from 'react-native';
import GlobalStyles, { spacing } from './GlobalStyles';

export const ChatScreenStyles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.medium,
        paddingTop: spacing.small,
    },
    listContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
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
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: spacing.medium,
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    navButton: {
        padding: spacing.small,
    },
    navButtonText: {
        ...GlobalStyles.text,
    },
});

export default ChatScreenStyles;
