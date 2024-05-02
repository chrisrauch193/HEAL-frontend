export interface BaseUser {
    user_id: string;
    type: string;
    email: string;
    name: string;
    date_of_birth: string;
    language: string;
}

export interface Patient extends BaseUser {
    type: 'PATIENT';
    height: number;
    weight: number;
}

export interface Doctor extends BaseUser {
    type: 'DOCTOR';
    hospital: string;
    specialisation: string;
}

export type UserProfile = Patient | Doctor;
