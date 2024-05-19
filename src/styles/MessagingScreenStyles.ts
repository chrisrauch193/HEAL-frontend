// src/styles/MessagingScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles, { spacing, colors, fonts } from '@src/styles/GlobalStyles';

const MessagingScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.medium,
        ...(Platform.OS === 'web' && {
            height: '100vh',
        }),
    },
    messageListContainer: {
        flex: 1,
        paddingBottom: spacing.medium,
    },
    scrollView: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.small,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 20,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
        marginRight: spacing.small,
        maxHeight: 80, // Limiting the height for better UI
        backgroundColor: colors.white,
    },
    buttonContainer: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: fonts.text,
        fontWeight: 'bold',
    },
    flatListContent: {
        paddingBottom: spacing.medium,
    },
});

export default MessagingScreenStyles;
