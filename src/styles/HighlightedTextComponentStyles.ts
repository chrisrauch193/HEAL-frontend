// src/styles/HighlightedTextComponentStyles.ts
import { StyleSheet } from "react-native";
import { colors } from './GlobalStyles';

export const HighlightedTextComponentStyles = StyleSheet.create({
    highlighted: {
        backgroundColor: '#e0f7fa',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginHorizontal: 2,
    },
    highlightedText: {
        color: '#00796b',
        fontWeight: 'bold',
    },
    normalText: {
        fontWeight: 'normal',
        color: colors.text,
    }
});

export default HighlightedTextComponentStyles;