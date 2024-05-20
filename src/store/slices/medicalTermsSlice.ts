// src/store/slices/medicalTermsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as medicalService from '../../services/medicalService';
import { MedicalTerm } from '../../types/medicalTypes';

interface MedicalTermsState {
    terms: MedicalTerm[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: MedicalTermsState = {
    terms: [],
    status: 'idle',
};

export const fetchMedicalTerms = createAsyncThunk(
    'medicalHistory/fetchMedicalTerms',
    async (language: string) => {
        return await medicalService.getMedicalTerms(language);
    }
);

const medicalTermsSlice = createSlice({
    name: 'medicalTerms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicalTerms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMedicalTerms.fulfilled, (state, action) => {
                state.terms = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchMedicalTerms.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default medicalTermsSlice.reducer;
