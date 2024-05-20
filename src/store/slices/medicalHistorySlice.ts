// src/store/slices/medicalHistorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as medicalService from '../../services/medicalService';
import { PatientCondition } from '../../types/medicalTypes';

interface MedicalHistoryState {
    conditions: PatientCondition[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: MedicalHistoryState = {
    conditions: [],
    status: 'idle',
};

export const fetchMedicalHistory = createAsyncThunk(
    'medicalHistory/fetchMedicalHistory',
    async (patientId: string) => {
        return await medicalService.getMedicalHistory(patientId);
    }
);

export const medicalHistorySlice = createSlice({
    name: 'medicalHistory',
    initialState,
    reducers: {
        // Define reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicalHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMedicalHistory.fulfilled, (state, action) => {
                state.conditions = action.payload.medicalConditions;
                console.log("AHHHH");
                console.log(state.conditions[0].prescriptions);
                console.log("BYEEE");
                state.status = 'idle';
            })
            .addCase(fetchMedicalHistory.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export default medicalHistorySlice.reducer;
