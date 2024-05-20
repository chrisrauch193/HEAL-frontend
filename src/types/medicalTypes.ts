// src/types/medicalTypes.ts
export interface MedicalTerm {
    medicalTermId: number;
    medicalTermType: 'CONDITION' | 'PRESCRIPTION' | 'GENERAL';
    name: string;
    description: string;
    medicalTermLinks: any[]; // Define the correct type if you have more details about the links
}

export interface PatientCondition {
    userConditionId: string;
    medicalTerm: MedicalTerm;
    status: string;
    diagnosisDate: string;
    resolutionDate?: string;
    prescriptions: PatientPrescription[];
}

export interface PatientPrescription {
    userPrescriptionId: string;
    medicalTerm: MedicalTerm;
    dosage: string;
    prescriptionDate: string;
    frequency: string;
}
