// src/types/medicalTypes.ts
export interface MedicalTerm {
    id: string;
    termType: 'CONDITION' | 'PRESCRIPTION' | 'GENERAL';
    name: string;
    description: string;
    url?: string;
    synonyms: { synonym: string; language: string }[];
}

export interface PatientCondition {
    id: string;
    medicalTerm: MedicalTerm;
    status: string;
    diagnosisDate: string;
    resolutionDate?: string;
    prescriptions: PatientPrescription[];
}

export interface PatientPrescription {
    id: string;
    medicalTerm: MedicalTerm;
    dosage: string;
    prescriptionDate: string;
    frequency: string;
}