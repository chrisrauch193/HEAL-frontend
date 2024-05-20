// api/socket.ts
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Define backendUrl based on the platform and environment
const isDev = process.env.NODE_ENV === 'development';
const localHostIP = '192.168.0.25'; // Your local network IP, change as necessary

const backendUrl = isDev ? `http://${localHostIP}:8888` : Platform.select({
  web: '/api',
  default: 'http://13.208.164.92:8888'
});

export const initializeSocket = async (roomId: string): Promise<Socket> => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
        throw new Error('No token found');
    }

    const socket: Socket = io(backendUrl, {
        auth: {
            token,
            roomId,
        },
    });

    return socket;
};

export default initializeSocket;
