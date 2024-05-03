import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as chatService from '../../services/chatService';
import { ChatRoom, ChatMessage } from '../../types/chatRoomTypes';

interface ChatState {
    rooms: ChatRoom[];
    messages: Record<string, ChatMessage[]>;  // Messages keyed by room_id
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ChatState = {
    rooms: [],
    messages: {},
    status: 'idle',
};

export const fetchRooms = createAsyncThunk('chat/fetchChatRooms', async (userId: string) => {
    return await chatService.getUserChatRooms(userId);
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (roomId: string) => {
    return await chatService.getChatRoomMessages(roomId);
});

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchRooms.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const roomId = action.meta.arg; // Assuming the room ID is passed as an argument
                state.messages[roomId] = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export default chatSlice.reducer;
