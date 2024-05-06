import React, { useState } from 'react';
import { Text, TextInput, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { updateUser, registerNewUser } from '../store/slices/userSlice';
import { userProfileFormStyles } from '../styles/userProfileFormStyles';
import { RootState } from '../store';

const UserProfileForm = ({ isEdit, defaultValues, onSubmitSuccess }) => {
    const userType = useSelector((state: RootState) => state.user.currentUserProfile.type);
    const [email, setEmail] = useState(defaultValues.email || '');
    const [name, setName] = useState(defaultValues.name || '');
    const initialDate = defaultValues.dateOfBirth ? new Date(defaultValues.dateOfBirth) : new Date();
    const [dateOfBirth, setDateOfBirth] = useState(initialDate);
    const [language, setLanguage] = useState(defaultValues.language || 'en');
    const [height, setHeight] = useState(defaultValues.height || 170); // Default height in cm
    const [weight, setWeight] = useState(defaultValues.weight || 70); // Default weight in kg
    const [hospital, setHospital] = useState(defaultValues.hospital || '');
    const [specialisation, setSpecialisation] = useState(defaultValues.specialisation || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dispatch = useDispatch();

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false);
        setDateOfBirth(currentDate);
    };

    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
        const userInfo = {
            email, name, dateOfBirth: dateOfBirth.toISOString().split('T')[0], language,
            ...(userType === 'PATIENT' ? { height, weight } : { hospital, specialisation })
        };
        
        if (isEdit) {
            await dispatch(updateUser({ ...userInfo, userId: defaultValues.userId }));
        } else {
            await dispatch(registerNewUser({ ...userInfo, type: userType }));
        }
        onSubmitSuccess();
    };

    return (
        <ScrollView style={userProfileFormStyles.container}>
            <Text style={userProfileFormStyles.heading}>{isEdit ? 'Edit Profile' : 'Register'}</Text>
            <Text style={userProfileFormStyles.label}>Email</Text>
            <TextInput
                style={userProfileFormStyles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={userProfileFormStyles.label}>Name</Text>
            <TextInput
                style={userProfileFormStyles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <Text style={userProfileFormStyles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={userProfileFormStyles.input}>
                <Text>{dateOfBirth.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DatePicker
                    value={dateOfBirth}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Text style={userProfileFormStyles.label}>Language</Text>
            <Picker
                selectedValue={language}
                style={userProfileFormStyles.input}
                onValueChange={setLanguage}
            >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="日本語 (Japanese)" value="jp" />
                <Picker.Item label="Français (French)" value="fr" />
                <Picker.Item label="Español (Spanish)" value="es" />
                <Picker.Item label="中文 (Chinese)" value="zh" />
                <Picker.Item label="العربية (Arabic)" value="ar" />
                <Picker.Item label="Русский (Russian)" value="ru" />
            </Picker>
            {userType === 'PATIENT' && (
                <>
                    <Text style={userProfileFormStyles.label}>Height (cm)</Text>
                    <Picker
                        selectedValue={height}
                        style={userProfileFormStyles.input}
                        onValueChange={setHeight}
                    >
                        {Array.from({ length: 100 }, (_, i) => 140 + i).map(value => (
                            <Picker.Item key={value} label={`${value} cm`} value={value} />
                        ))}
                    </Picker>
                    <Text style={userProfileFormStyles.label}>Weight (kg)</Text>
                    <Picker
                        selectedValue={weight}
                        style={userProfileFormStyles.input}
                        onValueChange={setWeight}
                    >
                        {Array.from({ length: 100 }, (_, i) => 40 + i).map(value => (
                            <Picker.Item key={value} label={`${value} kg`} value={value} />
                        ))}
                    </Picker>
                </>
            )}
            {userType === 'DOCTOR' && (
                <>
                    <Text style={userProfileFormStyles.label}>Hospital</Text>
                    <TextInput
                        style={userProfileFormStyles.input}
                        placeholder="Enter hospital name"
                        value={hospital}
                        onChangeText={setHospital}
                    />
                    <Text style={userProfileFormStyles.label}>Specialisation</Text>
                    <TextInput
                        style={userProfileFormStyles.input}
                        placeholder="Enter specialisation"
                        value={specialisation}
                        onChangeText={setSpecialisation}
                    />
                </>
            )}
            <Button
                title={isEdit ? 'Update Profile' : 'Register'}
                onPress={handleSubmit}
            />
        </ScrollView>
    );
};

export default UserProfileForm;
