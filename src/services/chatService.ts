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
        console.log("PAIN");
        console.log(response);
        console.log("PAIN");
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
        const response = await axiosInstance.get(`/users/chats`);
        return response.data.rooms;
    } catch (error) {
        console.error('Failed to get user chat rooms:', error);
        throw error;
    }
};

export const getChatRoomMessages = async (roomId: string, page: number, limit: number) => {
    try {
        const response = await axiosInstance.get(`/chats/${roomId}/messages`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get chat room messages:', error);
        throw error;
    }
};





export const getStep1Rooms = async () => {
    try {
        const response = await axiosInstance.get('/chats/step1');
        return response.data.rooms;
    } catch (error) {
        console.error('Failed to get step 1 rooms:', error);
        throw error;
    }
};

export const getStep2Rooms = async () => {
    try {
        const response = await axiosInstance.get('/chats/step2');
        return response.data.rooms;
    } catch (error) {
        console.error('Failed to get step 2 rooms:', error);
        throw error;
    }
};

export const getStep3Rooms = async () => {
    try {
        const response = await axiosInstance.get('/chats/step3');
        return response.data.rooms;
    } catch (error) {
        console.error('Failed to get step 3 rooms:', error);
        throw error;
    }
};

export const addDoctorToRoom = async (roomId: string, doctorId: string) => {
    try {
        const response = await axiosInstance.post(`/chats/${roomId}/add-doctor`, { doctorId });
        return response.data;
    } catch (error) {
        console.error('Failed to add doctor to room:', error);
        throw error;
    }
};