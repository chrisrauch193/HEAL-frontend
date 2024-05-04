// types/userTypes.ts
export type UserType = 'patient' | 'doctor';

export interface BaseUser {
    user_id: string;
    type: UserType;
    email: string;
    name: string;
    date_of_birth: string; // Consider using Date type if you're working directly with date objects
    language: string;
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
