// components/UserProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView, Picker } from 'react-native';
import { useDispatch } from 'react-redux';
import { registerNewUser, updateUser } from '../store/slices/userSlice';
import { registerStyles } from '../styles/registerStyles';

const UserProfileForm = ({ isEdit, defaultValues, onSubmitSuccess }) => {
    const [userType, setUserType] = useState(defaultValues.type || 'PATIENT');
    const [email, setEmail] = useState(defaultValues.email || '');
    const [name, setName] = useState(defaultValues.name || '');
    const [dateOfBirth, setDateOfBirth] = useState(defaultValues.dateOfBirth || '');
    const [language, setLanguage] = useState(defaultValues.language || '');
    const [height, setHeight] = useState(defaultValues.height?.toString() || '');
    const [weight, setWeight] = useState(defaultValues.weight?.toString() || '');
    const [hospital, setHospital] = useState(defaultValues.hospital || '');
    const [specialisation, setSpecialisation] = useState(defaultValues.specialisation || '');
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const userInfo = {
            email, name, dateOfBirth, language,
            ...(userType === 'PATIENT' ? { height: parseInt(height), weight: parseInt(weight) } : { hospital, specialisation })
        };
        
        if (isEdit) {
            await dispatch(updateUser({ ...userInfo, userId: defaultValues.userId }));
        } else {
            await dispatch(registerNewUser({ ...userInfo, type: userType }));
        }
        onSubmitSuccess();
    };

    return (
        <ScrollView style={registerStyles.container}>
            <Text style={registerStyles.heading}>{isEdit ? 'Edit Profile' : 'Register'}</Text>
            <Picker selectedValue={userType} style={registerStyles.input} onValueChange={setUserType}>
                <Picker.Item label="Patient" value="PATIENT" />
                <Picker.Item label="Doctor" value="DOCTOR" />
            </Picker>
            <TextInput style={registerStyles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={registerStyles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={registerStyles.input} placeholder="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} />
            <TextInput style={registerStyles.input} placeholder="Language" value={language} onChangeText={setLanguage} />
            {userType === 'PATIENT' && (
                <>
                    <TextInput style={registerStyles.input} placeholder="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
                    <TextInput style={registerStyles.input} placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
                </>
            )}
            {userType === 'DOCTOR' && (
                <>
                    <TextInput style={registerStyles.input} placeholder="Hospital" value={hospital} onChangeText={setHospital} />
                    <TextInput style={registerStyles.input} placeholder="Specialisation" value={specialisation} onChangeText={setSpecialisation} />
                </>
            )}
            <Button title={isEdit ? 'Update Profile' : 'Register'} onPress={handleSubmit} />
        </ScrollView>
    );
};

export default UserProfileForm;
