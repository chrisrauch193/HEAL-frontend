// src/services/medicalService.ts
import axiosInstance from '../api/axiosInstance';

export const getMedicalHistory = async (patientId: string) => {
    const response = await axiosInstance.get(`/patients/${patientId}/medical-history`);
    return response.data.medicalConditions;
};

export const getMedicalTerms = async (language: string) => {
    const response = await axiosInstance.get(`/medical-terms`, { params: { language } });
    return response.data.medicalTerms;
};

export const addCondition = async (patientId: string, medicalTermId: string, data: any) => {
    const response = await axiosInstance.post(`/patients/${patientId}/conditions/${medicalTermId}`, data);
    return response.data;
};

export const updateCondition = async (conditionId: string, status: string) => {
    const response = await axiosInstance.put(`/patients/conditions/${conditionId}`, { status });
    return response.data;
};

export const deleteCondition = async (conditionId: string) => {
    const response = await axiosInstance.delete(`/patients/conditions/${conditionId}`);
    return response.data;
};

export const addPrescription = async (conditionId: string, medicalTermId: string, data: any) => {
    const response = await axiosInstance.post(`/patients/conditions/${conditionId}/prescriptions/${medicalTermId}`, data);
    return response.data;
};

export const updatePrescription = async (prescriptionId: string, dosage: string, frequency: string) => {
    const response = await axiosInstance.put(`/patients/prescriptions/${prescriptionId}`, { dosage, frequency });
    return response.data;
};

export const deletePrescription = async (prescriptionId: string) => {
    const response = await axiosInstance.delete(`/patients/prescriptions/${prescriptionId}`);
    return response.data;
};
