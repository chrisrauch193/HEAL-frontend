// src/styles/MedicalTermDetailsModalStyles.ts
import { StyleSheet } from "react-native";
import { spacing, colors, fonts } from "@styles/GlobalStyles";

export const MedicalTermDetailsModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: spacing.large,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    termName: {
        fontSize: fonts.title,
        color: colors.text,
        marginBottom: spacing.small,
    },
    description: {
        fontSize: fonts.text,
        marginBottom: spacing.medium,
    },
    link: {
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    closeButton: {
        marginTop: spacing.small,
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: spacing.small,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: fonts.small,
        fontWeight: 'bold',
    },
});

export default MedicalTermDetailsModalStyles;