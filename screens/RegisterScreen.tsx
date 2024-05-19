// screens/Register.tsx
import React from 'react';
import UserProfileForm from '../components/UserProfileForm.tsx';
import { useNavigation } from '@react-navigation/native';
import RegisterScreenStyles from '../styles/RegisterScreenStyles';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const handleSuccess = () => {
        navigation.navigate("ChatScreen");
    };

    return (
        <UserProfileForm isEdit={false} defaultValues={{}} onSubmitSuccess={handleSuccess} style={RegisterScreenStyles.container} />
    );
};

export default RegisterScreen;
