import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as chatService from '../../services/chatService';

interface ChatState {
    rooms: any[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ChatState = {
    rooms: [],
    status: 'idle',
};

export const fetchRooms = createAsyncThunk('chat/fetchChatRooms', async (userId: string) => {
    return await chatService.getUserChatRooms(userId);
});

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.status = 'idle';
        })
        .addCase(fetchRooms.rejected, (state) => {
            state.status = 'failed';
        });
    }
});

export default chatSlice.reducer;
