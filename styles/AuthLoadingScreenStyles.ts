// src/styles/AuthLoadingScreenStyles.ts
import { StyleSheet } from 'react-native';
import GlobalStyles, { spacing } from './GlobalStyles';

export const AuthLoadingScreenStyles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...GlobalStyles.text,
        marginTop: spacing.medium,
    },
});

export default AuthLoadingScreenStyles;
