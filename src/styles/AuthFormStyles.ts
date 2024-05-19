// src/styles/AuthFormStyles.ts
import { StyleSheet } from 'react-native';
import GlobalStyles, { spacing, colors } from '@src/styles/GlobalStyles';

export const AuthFormStyles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        justifyContent: 'center',
        padding: spacing.large,
    },
    input: {
        ...GlobalStyles.input,
        width: '100%',
    },
    button: {
        ...GlobalStyles.button,
        marginTop: spacing.medium,
    },
    linkText: {
        ...GlobalStyles.text,
        color: colors.secondary,
        marginTop: spacing.small,
    },
});

export default AuthFormStyles;
