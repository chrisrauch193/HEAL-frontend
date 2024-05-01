// Import the necessary module from socket.io-client
import { io } from "socket.io-client";

// Create a socket connection
const socket = io.connect("http://localhost:4000");

// Export the socket
export default socket;