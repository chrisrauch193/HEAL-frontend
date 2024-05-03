import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

export const fetchInitialMessages = createAsyncThunk('chat/fetchInitialMessages', async (roomId: string) => {
    const messages = await chatService.getChatRoomMessages(roomId);
    return { roomId, messages };
});

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        receivedMessage: (state, action) => {
            const { roomId, message } = action.payload;
            if (!state.messages[roomId]) {
                state.messages[roomId] = [];
            }
            state.messages[roomId].push(message);
        },
        addOptimisticMessage: (state, action: PayloadAction<{ roomId: string; message: ChatMessage }>) => {
            const { roomId, message } = action.payload;
            if (!state.messages[roomId]) {
                state.messages[roomId] = [];
            }
            state.messages[roomId].push(message);
        },
    },
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
            .addCase(fetchInitialMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInitialMessages.fulfilled, (state, action) => {
                const { roomId, messages } = action.payload;
                state.messages[roomId] = messages;
                state.status = 'idle';
            })
            .addCase(fetchInitialMessages.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { receivedMessage, addOptimisticMessage } = chatSlice.actions;
export default chatSlice.reducer;
