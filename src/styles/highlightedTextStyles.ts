// styles/highlightedTextStyles.ts
import { StyleSheet } from "react-native";

export const highlightedTextStyles = StyleSheet.create({
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
    }
});
