// src/types/medicalTypes.ts
export interface MedicalTerm {
    medicalTermId: string;
    medicalTermType: string;
    name: string;
    description: string;
    medicalTermLinks: string[];
    synonyms: { synonym: string; language: string }[];
}
