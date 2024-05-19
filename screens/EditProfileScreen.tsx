// screens/EditProfileScreen.tsx
import React from 'react';
import UserProfileForm from '../components/UserProfileForm.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProfileScreenStyles from '../styles/ProfileScreenStyles';

const EditProfileScreen = ({ navigation }) => {
    const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);
    const handleSuccess = () => navigation.goBack();

    return (
        <UserProfileForm isEdit={true} defaultValues={currentUserProfile} onSubmitSuccess={handleSuccess} style={ProfileScreenStyles.container} />
    );
};

export default EditProfileScreen;
