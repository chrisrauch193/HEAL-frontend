// src/components/UserProfileForm.tsx
import React, { useState } from 'react';
import { Text, TextInput, ScrollView, Pressable, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { updateUser, registerNewUser, getUserProfile } from '../store/slices/userSlice';
import { UserProfileFormStyles } from '../styles/UserProfileFormStyles';
import { GlobalStyles } from '../styles/GlobalStyles';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';

const UserProfileForm = ({ isEdit, defaultValues, onSubmitSuccess }) => {
    const { t } = useTranslation();
    const [userType, setUserType] = useState(defaultValues.type || 'PATIENT');
    const [email, setEmail] = useState(defaultValues.email || '');
    const [name, setName] = useState(defaultValues.name || '');
    const initialDate = defaultValues.dateOfBirth ? new Date(defaultValues.dateOfBirth) : new Date();
    const [dateOfBirth, setDateOfBirth] = useState(initialDate);
    const [language, setLanguage] = useState(defaultValues.language || 'en');
    const [height, setHeight] = useState(defaultValues.height || 170); // Default height in cm
    const [weight, setWeight] = useState(defaultValues.weight || 70); // Default weight in kg
    const [hospital, setHospital] = useState(defaultValues.hospital || '');
    const [specialisation, setSpecialisation] = useState(defaultValues.specialisation || '');
    const [password, setPassword] = useState(defaultValues.password || ''); // Add state for password
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dispatch = useDispatch();
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);

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
            Alert.alert(t('invalidEmail'), t('pleaseEnterAValidEmailAddress'));
            return;
        }
        const userInfo = {
            email,
            name,
            dateOfBirth: dateOfBirth.toISOString().split('T')[0],
            language,
            height: userType === 'PATIENT' ? height : undefined,
            weight: userType === 'PATIENT' ? weight : undefined,
            hospital: userType === 'DOCTOR' ? hospital : undefined,
            specialisation: userType === 'DOCTOR' ? specialisation : undefined,
            password: isEdit ? undefined : password, // Add password to userInfo only for registration
        };

        if (isEdit) {
            const actionResult = await dispatch(updateUser({ userId: defaultValues.userId, userData: userInfo }));
            if (updateUser.fulfilled.match(actionResult)) {
                await dispatch(getUserProfile(actionResult.payload.userId)); // Fetch the updated profile
                onSubmitSuccess();
            } else {
                Alert.alert(t('updateFailed'), t('pleaseTryAgain'));
            }
        } else {
            const actionResult = await dispatch(registerNewUser({ ...userInfo, type: userType, password }));
            if (registerNewUser.fulfilled.match(actionResult)) {
                onSubmitSuccess();
            } else {
                Alert.alert(t('registrationFailed'), t('pleaseTryAgain'));
            }
        }
    };

    return (
        <ScrollView style={UserProfileFormStyles.container}>
            <Text style={UserProfileFormStyles.heading}>{isEdit ? t('editProfile') : t('register')}</Text>
            {!isEdit && (
                <>
                    <Text style={UserProfileFormStyles.label}>{t('userType')}</Text>
                    <Picker
                        selectedValue={userType}
                        style={UserProfileFormStyles.input}
                        onValueChange={(itemValue) => setUserType(itemValue)}
                    >
                        <Picker.Item label={t('patient')} value="PATIENT" />
                        <Picker.Item label={t('doctor')} value="DOCTOR" />
                    </Picker>
                </>
            )}
            <Text style={UserProfileFormStyles.label}>{t('email')}</Text>
            <TextInput
                style={UserProfileFormStyles.input}
                placeholder={t('enterYourEmail')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={UserProfileFormStyles.label}>{t('name')}</Text>
            <TextInput
                style={UserProfileFormStyles.input}
                placeholder={t('enterYourName')}
                value={name}
                onChangeText={setName}
            />
            {!isEdit && (
                <>
                    <Text style={UserProfileFormStyles.label}>{t('password')}</Text>
                    <TextInput
                        style={UserProfileFormStyles.input}
                        placeholder={t('enterYourPassword')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </>
            )}
            <Text style={UserProfileFormStyles.label}>{t('dateOfBirth')}</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={UserProfileFormStyles.input}>
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
            <Text style={UserProfileFormStyles.label}>{t('language')}</Text>
            <Picker
                selectedValue={language}
                style={UserProfileFormStyles.input}
                onValueChange={setLanguage}
            >
                <Picker.Item label={t('english')} value="en" />
                <Picker.Item label={t('japanese')} value="jp" />
                <Picker.Item label={t('french')} value="fr" />
                <Picker.Item label={t('spanish')} value="es" />
                <Picker.Item label={t('chinese')} value="zh" />
                <Picker.Item label={t('arabic')} value="ar" />
                <Picker.Item label={t('russian')} value="ru" />
            </Picker>
            {userType === 'PATIENT' && (
                <>
                    <Text style={UserProfileFormStyles.label}>{t('height')} (cm)</Text>
                    <Picker
                        selectedValue={height}
                        style={UserProfileFormStyles.input}
                        onValueChange={setHeight}
                    >
                        {Array.from({ length: 100 }, (_, i) => 140 + i).map(value => (
                            <Picker.Item key={value} label={`${value} cm`} value={value} />
                        ))}
                    </Picker>
                    <Text style={UserProfileFormStyles.label}>{t('weight')} (kg)</Text>
                    <Picker
                        selectedValue={weight}
                        style={UserProfileFormStyles.input}
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
                    <Text style={UserProfileFormStyles.label}>{t('hospital')}</Text>
                    <TextInput
                        style={UserProfileFormStyles.input}
                        placeholder={t('enterHospitalName')}
                        value={hospital}
                        onChangeText={setHospital}
                    />
                    <Text style={UserProfileFormStyles.label}>{t('specialisation')}</Text>
                    <TextInput
                        style={UserProfileFormStyles.input}
                        placeholder={t('enterSpecialisation')}
                        value={specialisation}
                        onChangeText={setSpecialisation}
                    />
                </>
            )}
            <Pressable style={GlobalStyles.button} onPress={handleSubmit}>
                <Text style={GlobalStyles.buttonText}>{isEdit ? t('updateProfile') : t('register')}</Text>
            </Pressable>
        </ScrollView>
    );
};

export default UserProfileForm;
