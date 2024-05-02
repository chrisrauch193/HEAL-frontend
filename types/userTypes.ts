export interface BaseUser {
    user_id: string;
    type: string;
    email: string;
    name: string;
    date_of_birth: string;
    language: string;
}

export interface Patient extends BaseUser {
    height: number;
    weight: number;
}

export interface Doctor extends BaseUser {
    hospital: string;
    specialisation: string;
}

export interface RegisterPatientInfo extends Omit<Patient, 'user_id'> { }
export interface RegisterDoctorInfo extends Omit<Doctor, 'user_id'> { }

export type UserProfile = Patient | Doctor;
