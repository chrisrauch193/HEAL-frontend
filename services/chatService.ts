// services/chatService.ts
import axiosInstance from '../api/axiosInstance';

export const createChatRoom = async () => {
    try {
        const response = await axiosInstance.post('/chats/new');
        return response.data;
    } catch (error) {
        console.error('Failed to create chat room:', error);
        throw error;
    }
};

export const getChatRoomDetails = async (roomId: string) => {
    try {
        const response = await axiosInstance.get(`/chats/${roomId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get chat room details:', error);
        throw error;
    }
};

export const deleteChatRoom = async (roomId: string) => {
    try {
        const response = await axiosInstance.delete(`/chats/${roomId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete chat room:', error);
        throw error;
    }
};

export const addParticipantToRoom = async (roomId: string, userId: string) => {
    try {
        const response = await axiosInstance.post(`/chats/${roomId}/participants/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to add participant:', error);
        throw error;
    }
};

export const removeParticipantFromRoom = async (roomId: string, userId: string) => {
    try {
        const response = await axiosInstance.delete(`/chats/${roomId}/participants/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to remove participant:', error);
        throw error;
    }
};

export const getUserChatRooms = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}/chats`);
        return response.data.rooms;
    } catch (error) {
        console.error('Failed to get user chat rooms:', error);
        throw error;
    }
};

export const getChatRoomMessages = async (roomId: string) => {
    try {
        const response = await axiosInstance.get(`/chats/${roomId}/messages`);
        return response.data.messages;
    } catch (error) {
        console.error('Failed to get chat room messages:', error);
        throw error;
    }
};
