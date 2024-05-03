import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
    modalContainer: {
        width: "100%",
        borderTopColor: "#ddd",
        borderTopWidth: 1,
        elevation: 1,
        height: 400,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        zIndex: 10,
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    modalsubheading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    modalinput: {
        borderWidth: 2,
        padding: 15,
    },
    modalbuttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    modalbutton: {
        width: "40%",
        height: 45,
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    },
    modaltext: {
        color: "#fff",
    },
    tooltipContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "left",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "100%",
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
});
