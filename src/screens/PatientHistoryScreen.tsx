// src/screens/PatientHistoryScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchMedicalHistory, deleteCondition, deletePrescription, updateCondition, updatePrescription } from '../store/slices/medicalHistorySlice';
import { useTranslation } from 'react-i18next';
import { PatientCondition } from '../types/medicalTypes';
import { PatientHistoryScreenStyles } from '../styles/PatientHistoryScreenStyles';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native';

const PatientHistoryScreen = ({ route, navigation }) => {
    const { t } = useTranslation();
    const { patientId } = route.params;
    const dispatch = useDispatch();
    const { conditions, status } = useSelector((state: RootState) => state.medicalHistory);
    const currentUser = useSelector((state: RootState) => state.user.currentUserProfile);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchMedicalHistory(patientId));
        }, [dispatch, patientId])
    );

    const handleEditCondition = (conditionId: string) => {
        navigation.navigate('EditConditionScreen', { conditionId, patientId });
    };

    const handleDeleteCondition = (conditionId: string) => {
        dispatch(deleteCondition(conditionId));
    };

    const handleEditPrescription = (prescriptionId: string) => {
        navigation.navigate('EditPrescriptionScreen', { prescriptionId, patientId });
    };

    const handleDeletePrescription = (prescriptionId: string) => {
        dispatch(deletePrescription(prescriptionId));
    };

    const renderCondition = ({ item }: { item: PatientCondition }) => (
        <View style={PatientHistoryScreenStyles.conditionContainer}>
            <Text style={PatientHistoryScreenStyles.conditionName}>{item.medicalTerm.name}</Text>
            <Text style={PatientHistoryScreenStyles.conditionDetail}>{t('status')}: {item.status}</Text>
            <Text style={PatientHistoryScreenStyles.conditionDetail}>{t('diagnosisDate')}: {new Date(item.diagnosisDate).toLocaleDateString()}</Text>
            {item.resolutionDate && <Text style={PatientHistoryScreenStyles.conditionDetail}>{t('resolutionDate')}: {new Date(item.resolutionDate).toLocaleDateString()}</Text>}
            {currentUser?.type === 'DOCTOR' && (
                <>
                    <Pressable style={GlobalStyles.button} onPress={() => handleEditCondition(item.userConditionId)}>
                        <Text style={GlobalStyles.buttonText}>{t('editCondition')}</Text>
                    </Pressable>
                    <Pressable style={[GlobalStyles.button, { backgroundColor: 'red' }]} onPress={() => handleDeleteCondition(item.userConditionId)}>
                        <Text style={GlobalStyles.buttonText}>{t('deleteCondition')}</Text>
                    </Pressable>
                </>
            )}
            {item.prescriptions.map((prescription) => (
                <View key={prescription.userPrescriptionId} style={PatientHistoryScreenStyles.prescriptionContainer}>
                    <Text style={PatientHistoryScreenStyles.prescriptionName}>{prescription.medicalTerm.name}</Text>
                    <Text style={PatientHistoryScreenStyles.prescriptionDetail}>{t('dosage')}: {prescription.dosage}</Text>
                    <Text style={PatientHistoryScreenStyles.prescriptionDetail}>{t('prescriptionDate')}: {new Date(prescription.prescriptionDate).toLocaleDateString()}</Text>
                    <Text style={PatientHistoryScreenStyles.prescriptionDetail}>{t('frequency')}: {prescription.frequency}</Text>
                    {currentUser?.type === 'DOCTOR' && (
                        <>
                            <Pressable style={GlobalStyles.button} onPress={() => handleEditPrescription(prescription.userPrescriptionId)}>
                                <Text style={GlobalStyles.buttonText}>{t('editPrescription')}</Text>
                            </Pressable>
                            <Pressable style={[GlobalStyles.button, { backgroundColor: 'red' }]} onPress={() => handleDeletePrescription(prescription.userPrescriptionId)}>
                                <Text style={GlobalStyles.buttonText}>{t('deletePrescription')}</Text>
                            </Pressable>
                        </>
                    )}
                </View>
            ))}
        </View>
    );

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" style={PatientHistoryScreenStyles.loadingIndicator} />;
    }

    if (status === 'failed') {
        return <Text style={PatientHistoryScreenStyles.errorText}>{t('errorFetchingHistory')}</Text>;
    }

    if (!conditions || conditions.length === 0) {
        return <Text style={PatientHistoryScreenStyles.noHistoryText}>{t('noMedicalHistory')}</Text>;
    }

    return (
        <FlatList
            contentContainerStyle={PatientHistoryScreenStyles.container}
            data={conditions}
            renderItem={renderCondition}
            keyExtractor={(item) => item.userConditionId.toString()}
        />
    );
};

export default PatientHistoryScreen;
