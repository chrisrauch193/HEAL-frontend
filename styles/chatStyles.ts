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
});
