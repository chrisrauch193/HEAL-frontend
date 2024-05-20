// src/screens/EditPrescriptionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchMedicalHistory, updatePrescription } from '../store/slices/medicalHistorySlice';
import { useTranslation } from 'react-i18next';

const EditPrescriptionScreen = ({ route, navigation }) => {
    const { t } = useTranslation();
    const { prescriptionId, patientId } = route.params;
    const dispatch = useDispatch();
    const prescription = useSelector((state: RootState) => state.medicalHistory.conditions.flatMap(c => c.prescriptions).find(p => p.userPrescriptionId === prescriptionId));
    const [dosage, setDosage] = useState(prescription?.dosage || '');
    const [frequency, setFrequency] = useState(prescription?.frequency || '');

    useEffect(() => {
        if (!prescription) {
            dispatch(fetchMedicalHistory(patientId));
        }
    }, [dispatch, prescription, patientId]);

    const handleSave = () => {
        dispatch(updatePrescription({ prescriptionId, patientId, dosage, frequency }));
        navigation.goBack();
    };

    if (!prescription) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <Text>{t('editPrescription')}</Text>
            <Text>{prescription.medicalTerm.name}</Text>
            <TextInput value={dosage} onChangeText={setDosage} />
            <TextInput value={frequency} onChangeText={setFrequency} />
            <Button title={t('save')} onPress={handleSave} />
        </View>
    );
};

export default EditPrescriptionScreen;
