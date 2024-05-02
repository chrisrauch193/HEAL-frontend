import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Alert, Picker } from 'react-native';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../store/slices/userSlice';
import { registerStyles } from '../styles/registerStyles';

const Register = ({ navigation }) => {
    const [userType, setUserType] = useState('PATIENT');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [language, setLanguage] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [hospital, setHospital] = useState('');
    const [specialisation, setSpecialisation] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const userInfo = {
            email, name, dateOfBirth, language,
            ...(userType === 'PATIENT' ? { height: parseInt(height), weight: parseInt(weight) } : { hospital, specialisation })
        };
        await dispatch(registerNewUser({ ...userInfo, type: userType }));
        navigation.navigate("Chat");
    };

    return (
        <ScrollView style={registerStyles.container}>
            <Text style={registerStyles.heading}>Register</Text>
            <Picker selectedValue={userType} style={registerStyles.input} onValueChange={(itemValue) => setUserType(itemValue)}>
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
            <Pressable style={registerStyles.button} onPress={handleSubmit}>
                <Text style={registerStyles.buttonText}>Register</Text>
            </Pressable>
        </ScrollView>
    );
};

export default Register;
