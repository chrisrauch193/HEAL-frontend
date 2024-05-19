// screens/Register.tsx
import React from 'react';
import UserProfileForm from '../components/UserProfileForm.tsx';

const RegisterScreen = ({ navigation }) => {
    const handleSuccess = () => navigation.navigate("ChatScreen");

    return <UserProfileForm isEdit={false} defaultValues={{}} onSubmitSuccess={handleSuccess} />;
};

export default RegisterScreen;