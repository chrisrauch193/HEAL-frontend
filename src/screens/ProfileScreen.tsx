// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Button, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchUserProfileById } from '../store/slices/medicalProfilesSlice';
import { logoutUser, getUserProfile } from '../store/slices/userSlice';
import { ProfileScreenStyles } from '../styles/ProfileScreenStyles';
import { useFocusEffect } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';

const ProfileScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { viewUserId } = route.params;
  const dispatch = useDispatch();
  const currentUserProfile = useSelector((state: RootState) => state.user.currentUserProfile);
  const { viewedProfiles, status } = useSelector((state: RootState) => state.medicalProfiles);
  const viewedProfile = viewedProfiles[viewUserId] || null;
  const [error, setError] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      if (currentUserProfile && currentUserProfile.userId === viewUserId) {
        dispatch(getUserProfile(viewUserId));
      }
    }, [dispatch, viewUserId, currentUserProfile])
  );

  useEffect(() => {
      if (!viewedProfile) {
          dispatch(fetchUserProfileById(viewUserId));
      }
  }, [dispatch, viewedProfile, viewUserId]);

  const isCurrentUser = currentUserProfile?.userId === viewUserId;

  const handleEditProfile = () => {
      navigation.navigate('EditProfileScreen');
  };

  const handleLogout = () => {
      dispatch(logoutUser());
      navigation.navigate('LoginScreen');
  };

  if (status === 'loading') {
      return <ActivityIndicator size="large" />;
  }

  if (error) {
      return (
          <View style={ProfileScreenStyles.container}>
              <Text>{error}</Text>
              <Button title={t('retry')} onPress={() => {
                  setError('');
                  dispatch(fetchUserProfileById(viewUserId));
              }} />
          </View>
      );
  }

  if (!viewedProfile) {
      return <Text>{t('profileNotFound')}</Text>;
  }
  
  const handleViewHistory = () => {
    navigation.navigate('PatientHistoryScreen', { patientId: viewUserId });
  };

  return (
      <ScrollView style={ProfileScreenStyles.container}>
          <Text style={ProfileScreenStyles.name}>{viewedProfile.name}</Text>
          <Text style={ProfileScreenStyles.details}>{t('email')}: {viewedProfile.email}</Text>
          <Text style={ProfileScreenStyles.details}>{t('type')}: {viewedProfile.type}</Text>
          <Text style={ProfileScreenStyles.details}>{t('DOB')}: {viewedProfile.dateOfBirth}</Text>
          <Text style={ProfileScreenStyles.details}>{t('language')}: {viewedProfile.language}</Text>
          {viewedProfile.type === 'PATIENT' && (
              <>
                  <Text style={ProfileScreenStyles.details}>{t('height')}: {viewedProfile.height} cm</Text>
                  <Text style={ProfileScreenStyles.details}>{t('weight')}: {viewedProfile.weight} kg</Text>
                  <TouchableOpacity style={ProfileScreenStyles.button} onPress={handleViewHistory}>
                      <Text style={ProfileScreenStyles.buttonText}>{t('viewMedicalHistory')}</Text>
                  </TouchableOpacity>
              </>
          )}
          {viewedProfile.type === 'DOCTOR' && (
              <>
                  <Text style={ProfileScreenStyles.details}>{t('hospital')}: {viewedProfile.hospital}</Text>
                  <Text style={ProfileScreenStyles.details}>{t('specialisation')}: {viewedProfile.specialisation}</Text>
              </>
          )}
          {isCurrentUser && (
              <>
                  <TouchableOpacity style={ProfileScreenStyles.button} onPress={handleEditProfile}>
                      <Text style={ProfileScreenStyles.buttonText}>{t('editProfile')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[ProfileScreenStyles.button, { backgroundColor: 'red' }]} onPress={handleLogout}>
                      <Text style={ProfileScreenStyles.buttonText}>{t('logOut')}</Text>
                  </TouchableOpacity>
              </>
          )}
      </ScrollView>
  );
};

export default ProfileScreen;
