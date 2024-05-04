// src/screens/ProfileScreen.tsx
import React, { useEffect } from 'react';
import { Text, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { RootState } from '../store';
import { fetchUserProfileById } from '../store/slices/userSlice';
import { profileStyles } from '../styles/profileStyles';

const ProfileScreen: React.FC = ()  => {
  const dispatch = useDispatch();
  const route = useRoute();
  const viewUserId = route.params.viewUserId; // Access userId passed as parameter
  const { currentUserProfile, viewedProfiles } = useSelector((state: RootState) => state.user);

  const userProfile = viewedProfiles[viewUserId] || currentUserProfile;
  const isCurrentUser = currentUserProfile?.userId === viewUserId;

  useEffect(() => {
    // Only fetch the profile if it's not already loaded
    if (!viewedProfiles[viewUserId]) {
      // dispatch(fetchUserProfileById(viewUserId));
    }
  }, [dispatch, viewUserId, viewedProfiles]);

  if (!userProfile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <ScrollView style={profileStyles.container}>
      <Text style={profileStyles.name}>{userProfile.name}</Text>
      <Text style={profileStyles.details}>Email: {userProfile.email}</Text>
      <Text style={profileStyles.details}>Type: {userProfile.type}</Text>
      <Text style={profileStyles.details}>DOB: {userProfile.dateOfBirth}</Text>
      <Text style={profileStyles.details}>Language: {userProfile.language}</Text>
      {userProfile.type === 'PATIENT' && (
        <>
          <Text style={profileStyles.details}>Height: {userProfile.height} cm</Text>
          <Text style={profileStyles.details}>Weight: {userProfile.weight} kg</Text>
        </>
      )}
      {userProfile.type === 'DOCTOR' && (
        <>
          <Text style={profileStyles.details}>Hospital: {userProfile.hospital}</Text>
          <Text style={profileStyles.details}>Specialisation: {userProfile.specialisation}</Text>
        </>
      )}
      <Button title="Edit Profile" onPress={() => {}} />
      {isCurrentUser && (
        <Button title="Logout" onPress={() => {}} color="red" />
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
