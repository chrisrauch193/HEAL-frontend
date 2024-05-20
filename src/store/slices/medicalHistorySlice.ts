// src/store/slices/medicalHistorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as medicalService from '../../services/medicalService';
import { PatientCondition, MedicalTerm } from '../../types/medicalTypes';

interface MedicalHistoryState {
    conditions: PatientCondition[];
    terms: MedicalTerm[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: MedicalHistoryState = {
    conditions: [],
    terms: [],
    status: 'idle',
};

export const fetchMedicalHistory = createAsyncThunk(
    'medicalHistory/fetchMedicalHistory',
    async (patientId: string) => {
        return await medicalService.getMedicalHistory(patientId);
    }
);

export const addCondition = createAsyncThunk(
    'medicalHistory/addCondition',
    async ({ patientId, selectedConditionId, data }: { patientId: string, selectedConditionId: string, data: any }) => {
        return await medicalService.addCondition(patientId, selectedConditionId, data);
    }
);

export const addPrescription = createAsyncThunk(
    'medicalHistory/addPrescription',
    async ({ conditionId, selectedPrescriptionId, data }: { conditionId: string, selectedPrescriptionId: string, data: any }) => {
        return await medicalService.addPrescription(conditionId, selectedPrescriptionId, data);
    }
);

export const updateCondition = createAsyncThunk(
    'medicalHistory/updateCondition',
    async ({ conditionId, status }: { conditionId: string, status: string }) => {
        return await medicalService.updateCondition(conditionId, status);
    }
);

export const updatePrescription = createAsyncThunk(
    'medicalHistory/updatePrescription',
    async ({ prescriptionId, dosage, frequency }: { prescriptionId: string, dosage: string, frequency: string }) => {
        return await medicalService.updatePrescription(prescriptionId, dosage, frequency);
    }
);

export const deleteCondition = createAsyncThunk(
    'medicalHistory/deleteCondition',
    async (conditionId: string) => {
        return await medicalService.deleteCondition(conditionId);
    }
);

export const deletePrescription = createAsyncThunk(
    'medicalHistory/deletePrescription',
    async (prescriptionId: string) => {
        return await medicalService.deletePrescription(prescriptionId);
    }
);

const medicalHistorySlice = createSlice({
    name: 'medicalHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicalHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMedicalHistory.fulfilled, (state, action) => {
                state.conditions = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchMedicalHistory.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addCondition.fulfilled, (state, action) => {
                state.conditions = action.payload.medicalConditions;
            })
            .addCase(addPrescription.fulfilled, (state, action) => {
                const condition = state.conditions.find(c => c.id === action.meta.arg.conditionId);
                if (condition) {
                    condition.prescriptions.push(action.payload);
                }
            })
            .addCase(updateCondition.fulfilled, (state, action) => {
                const index = state.conditions.findIndex(c => c.userConditionId === action.payload.userConditionId);
                if (index !== -1) {
                    state.conditions[index] = action.payload;
                }
            })
            .addCase(updatePrescription.fulfilled, (state, action) => {
                const conditionIndex = state.conditions.findIndex(c => c.prescriptions.some(p => p.userPrescriptionId === action.payload.userPrescriptionId));
                if (conditionIndex !== -1) {
                    const prescriptionIndex = state.conditions[conditionIndex].prescriptions.findIndex(p => p.userPrescriptionId === action.payload.userPrescriptionId);
                    state.conditions[conditionIndex].prescriptions[prescriptionIndex] = action.payload;
                }
            })
            .addCase(deleteCondition.fulfilled, (state, action) => {
                state.conditions = state.conditions.filter(c => c.userConditionId !== action.meta.arg);
            })
            .addCase(deletePrescription.fulfilled, (state, action) => {
                state.conditions.forEach(c => {
                    c.prescriptions = c.prescriptions.filter(p => p.userPrescriptionId !== action.meta.arg);
                });
            });
    },
});

export default medicalHistorySlice.reducer;
