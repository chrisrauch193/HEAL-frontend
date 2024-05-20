// types/userTypes.ts
export type UserType = 'PATIENT' | 'DOCTOR';

export interface BaseUser {
    userId: string;
    type: UserType;
    email: string;
    name: string;
    dateOfBirth: string; // Consider using Date type if you're working directly with date objects
    language: string;
    password: string;
}

export interface Patient extends BaseUser {
    height: number; // Ensure units are clear, possibly in the name e.g., heightInCm
    weight: number; // Same here, e.g., weightInKg
}

export interface Doctor extends BaseUser {
    hospital: string;
    specialisation: string;
}

export type RegisterPatientInfo = Patient;
export type RegisterDoctorInfo = Doctor;

export type UserProfile = Patient | Doctor;
