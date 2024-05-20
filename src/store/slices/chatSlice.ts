// store/slices/chatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as chatService from '../../services/chatService';
import { ChatRoom, ChatMessage } from '../../types/chatTypes';

interface ChatState {
    rooms: ChatRoom[];
    step1Rooms: ChatRoom[];
    step2Rooms: ChatRoom[];
    step3Rooms: ChatRoom[];
    messages: Record<string, ChatMessage[]>;  // Messages keyed by roomId
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ChatState = {
    rooms: [],
    step1Rooms: [],
    step2Rooms: [],
    step3Rooms: [],
    messages: {},
    status: 'idle',
};

export const fetchRooms = createAsyncThunk('chat/fetchChatRooms', async (userId: string) => {
    return await chatService.getUserChatRooms(userId);
});

export const fetchStep1Rooms = createAsyncThunk('chat/fetchStep1Rooms', async () => {
    return await chatService.getStep1Rooms();
});

export const fetchStep2Rooms = createAsyncThunk('chat/fetchStep2Rooms', async () => {
    return await chatService.getStep2Rooms();
});

export const fetchStep3Rooms = createAsyncThunk('chat/fetchStep3Rooms', async () => {
    return await chatService.getStep3Rooms();
});

export const fetchInitialMessages = createAsyncThunk('chat/fetchInitialMessages', async ({ roomId, page, limit }) => {
    const messages = await chatService.getChatRoomMessages(roomId, page, limit);
    return { roomId, messages, isInitial: true };
});

export const fetchMoreMessages = createAsyncThunk('chat/fetchMoreMessages', async ({ roomId, page, limit }) => {
    const messages = await chatService.getChatRoomMessages(roomId, page, limit);
    return { roomId, messages, isInitial: false };
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
        addOptimisticRoom: (state, action: PayloadAction<ChatRoom>) => {
            state.rooms.push(action.payload);
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
            .addCase(fetchStep1Rooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStep1Rooms.fulfilled, (state, action) => {
                state.step1Rooms = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchStep1Rooms.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchStep2Rooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStep2Rooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchStep2Rooms.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchStep3Rooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStep3Rooms.fulfilled, (state, action) => {
                state.step3Rooms = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchStep3Rooms.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchInitialMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInitialMessages.fulfilled, (state, action) => {
                const { roomId, messages, isInitial } = action.payload;
                if (isInitial) {
                    state.messages[roomId] = messages;
                } else {
                    state.messages[roomId] = [...messages, ...state.messages[roomId]];
                }
                state.status = 'idle';
            })
            .addCase(fetchInitialMessages.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchMoreMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMoreMessages.fulfilled, (state, action) => {
                const { roomId, messages } = action.payload;
                state.messages[roomId] = [...state.messages[roomId], ...messages];
                state.status = 'idle';
            })
            .addCase(fetchMoreMessages.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { receivedMessage, addOptimisticMessage, addOptimisticRoom } = chatSlice.actions;
export default chatSlice.reducer;
