// src/styles/MessagingScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles, { spacing } from '@styles/GlobalStyles';

export const MessagingScreenStyles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
    },
    messageListContainer: {
        flex: 1,
        paddingBottom: Platform.OS === 'web' ? 20 : 0,
    },
    inputContainer: {
        ...GlobalStyles.container,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        ...GlobalStyles.input,
        flex: 1,
        marginRight: spacing.small,
    },
    buttonContainer: {
        ...GlobalStyles.button,
    },
});

export default MessagingScreenStyles;
