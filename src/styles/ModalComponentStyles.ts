// src/styles/ModalComponentStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { spacing, colors, fonts } from '@styles/GlobalStyles';

export const ModalComponentStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal backdrop
        padding: spacing.large,
        ...(Platform.OS === 'web' && {
            height: '100vh', // Full viewport height on web
            overflowY: 'auto', // Allow scrolling on web
        }),
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.large,
        width: '80%', // Adjust width as per design requirement
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        fontSize: fonts.title,
        marginBottom: spacing.medium,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalText: {
        fontSize: fonts.text,
        color: colors.text,
        marginBottom: spacing.small,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: spacing.medium,
    },
    modalButton: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: 10,
        minWidth: 100, // Ensures all buttons are of equal size
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        top: spacing.medium,
        right: spacing.medium,
        backgroundColor: colors.secondary,
        borderRadius: 20,
        padding: spacing.small,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    link: {
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    tooltipContainer: {
        padding: spacing.medium,
        backgroundColor: colors.background,
        borderRadius: 15,
    },
    modalsubheading: {
        fontSize: fonts.text,
        fontWeight: 'bold',
        marginBottom: spacing.small,
        textAlign: 'center',
    },
    modalinput: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 4,
        padding: spacing.small,
        fontSize: fonts.text,
        marginBottom: spacing.medium,
        color: colors.text,
        backgroundColor: colors.white,
        ...(Platform.OS === 'web' && {
            width: '100%', // Full width inputs on web
        }),
    },
    modaltext: {
        fontSize: fonts.text,
        color: colors.text,
    },
});

export default ModalComponentStyles;
