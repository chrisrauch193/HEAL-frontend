// utils/socket.ts
import { io } from "socket.io-client";
import store from '../store';
import { receivedMessage } from '../store/slices/chatSlice';
import Constants from 'expo-constants';

const { backendUrl } = Constants.expoConfig.extra;
const socket = io(backendUrl);

export const initializeChat = (roomId) => {
  socket.on('message', message => {
    if (message.roomId === roomId) {
      store.dispatch(receivedMessage({ roomId: message.roomId, message }));
    }
  });

  return socket;
};

export default socket;
