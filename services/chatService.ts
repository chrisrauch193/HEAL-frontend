import axiosInstance from '../api/axiosInstance';

export const createChatRoom = async () => {
    try {
        const response = await axiosInstance.post('/chats/new', {}, {
            headers: {'x-mock-response-name': 'Create Chat Room Created'}
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create chat room:', error);
        throw error;
    }
};

export const getChatRoomDetails = async (roomId: string) => {
    try {
        const response = await axiosInstance.get(`/chats/${roomId}`, {
            headers: {'x-mock-response-name': 'Get Chat Room Details Success'}
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get chat room details:', error);
        throw error;
    }
};

export const deleteChatRoom = async (roomId: string) => {
    try {
        const response = await axiosInstance.delete(`/chats/${roomId}`, {
            headers: {'x-mock-response-name': 'Delete Chat Room Success'}
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete chat room:', error);
        throw error;
    }
};

export const addParticipantToRoom = async (roomId: string, userId: string) => {
    try {
        const response = await axiosInstance.post(`/chats/${roomId}/participants/${userId}`, {}, {
            headers: {'x-mock-response-name': 'Add Participant to Chat Room Created'}
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add participant:', error);
        throw error;
    }
};

export const removeParticipantFromRoom = async (roomId: string, userId: string) => {
    try {
        const response = await axiosInstance.delete(`/chats/${roomId}/participants/${userId}`, {
            headers: {'x-mock-response-name': 'Remove Participant from Chat Room Success'}
        });
        return response.data;
    } catch (error) {
        console.error('Failed to remove participant:', error);
        throw error;
    }
};

export const getUserChatRooms = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}/chats`, {
            headers: {'x-mock-response-name': 'Get User Chat Rooms Success'}
        });
        console.log(response.data.rooms);
        return response.data.rooms;
    } catch (error) {
        console.error('Failed to get user chat rooms:', error);
        throw error;
    }
};
