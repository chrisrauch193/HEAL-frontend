// utils/socket.ts
import { io } from "socket.io-client";
import store from '../store';
import { receivedMessage } from '../store/slices/chatSlice';
import { SOCKET_URL } from "../config";

const socket = io(SOCKET_URL);

export const initializeChat = (roomId) => {
  socket.on('message', message => {
    if (message.room_id === roomId) {
      store.dispatch(receivedMessage({ roomId: message.room_id, message }));
    }
  });

  return socket;
};

export default socket;
