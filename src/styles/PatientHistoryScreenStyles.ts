// src/styles/PatientHistoryScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles, { spacing, colors, fonts } from './GlobalStyles';

export const PatientHistoryScreenStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
        ...(Platform.OS === 'web' && {
            height: '100vh',
            overflowY: 'auto',
        }),
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.text,
        fontSize: fonts.text,
        textAlign: 'center',
    },
    noHistoryText: {
        color: colors.text,
        fontSize: fonts.text,
        textAlign: 'center',
    },
    conditionContainer: {
        backgroundColor: colors.lightGray,
        padding: spacing.medium,
        borderRadius: 8,
        marginBottom: spacing.medium,
    },
    conditionName: {
        fontSize: fonts.title,
        color: colors.primary,
        marginBottom: spacing.small,
    },
    conditionDetail: {
        fontSize: fonts.text,
        color: colors.text,
        marginBottom: spacing.small,
    },
    prescriptionContainer: {
        backgroundColor: colors.white,
        padding: spacing.small,
        borderRadius: 4,
        marginTop: spacing.small,
    },
    prescriptionName: {
        fontSize: fonts.text,
        color: colors.secondary,
        marginBottom: spacing.small,
    },
    prescriptionDetail: {
        fontSize: fonts.text,
        color: colors.text,
        marginBottom: spacing.small,
    },
    editButton: {
        backgroundColor: colors.primary,
        padding: spacing.small,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: spacing.small,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: spacing.small,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: spacing.small,
    },
    buttonText: {
        color: colors.white,
        fontSize: fonts.text,
        fontWeight: 'bold',
    },
});

export default PatientHistoryScreenStyles;
