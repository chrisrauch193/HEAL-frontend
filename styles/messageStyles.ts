// styles/messageStyles.ts
import { StyleSheet } from 'react-native';

const messageStyles = StyleSheet.create({
    myMessage: {
        flexDirection: "row",
        justifyContent: "flex-end", // Aligns this to the right
        padding: 10,
        marginVertical: 4,
        marginLeft: 10,
    },
    otherMessage: {
        flexDirection: "row",
        justifyContent: "flex-start", // Aligns this to the left
        padding: 10,
        marginVertical: 4,
        marginRight: 10,
    },
    messageContent: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    myMessageContent: {
        backgroundColor: "#DCF8C6", // Light green background for current user
    },
    otherMessageContent: {
        backgroundColor: "#ECECEC", // Light gray background for other users
    },
    myMessageText: {
        color: "black",
        textAlign: "left"
    },
    otherMessageText: {
        color: "black",
        textAlign: "left"
    },
    avatar: {
        padding: 5,
        alignSelf: "flex-end"
    },
    medicalTermHighlight: {
        color: "blue",
        textDecorationLine: "underline",
    },
    timestamp: {
        fontSize: 12,
        color: "#555",
        alignSelf: "flex-end",
        paddingTop: 5
    },
});

export default messageStyles;
