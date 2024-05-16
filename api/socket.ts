// api/socket.ts
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { backendUrl } = Constants.expoConfig.extra;

export const initializeSocket = async (roomId: string) => {
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
