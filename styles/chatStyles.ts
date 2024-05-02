import { StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        padding: 10,
        position: "relative",
    },
    header: {
        backgroundColor: "#F7F7F7",
        height: 70,
        width: "100%",
        padding: 20,
        justifyContent: "center",
        marginBottom: 15,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    emptyContainer: {
        width: "100%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontWeight: "bold",
        fontSize: 24,
        paddingBottom: 30,
    },
    chat: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        height: 80,
        marginBottom: 10,
    },
    avatar: {
        marginRight: 15,
    },
    rightContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    username: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    message: {
        fontSize: 14,
        opacity: 0.7,
    },
    time: {
        opacity: 0.5,
    },
});
