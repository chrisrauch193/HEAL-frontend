// src/styles/ProfileScreenStyles.ts
import { StyleSheet } from 'react-native';
import GlobalStyles, { spacing } from '@styles/GlobalStyles';

export const ProfileScreenStyles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        paddingVertical: spacing.medium,
    },
    detailText: {
        ...GlobalStyles.text,
        marginBottom: spacing.small,
    },
    button: {
        ...GlobalStyles.button,
        marginTop: spacing.large,
    },
    name: {
        fontWeight: 'bold',
        ...GlobalStyles.text,
        marginBottom: spacing.small,
    },
});

export default ProfileScreenStyles;
