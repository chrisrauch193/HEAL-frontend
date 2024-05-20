// src/screens/EditPrescriptionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchMedicalHistory, updatePrescription } from '../store/slices/medicalHistorySlice';
import { useTranslation } from 'react-i18next';
import { GlobalStyles } from '../styles/GlobalStyles';

const EditPrescriptionScreen = ({ route, navigation }) => {
    const { t } = useTranslation();
    const { prescriptionId, patientId } = route.params;
    const dispatch = useDispatch();
    const prescription = useSelector((state: RootState) => state.medicalHistory.conditions.flatMap(c => c.prescriptions).find(p => p.userPrescriptionId === prescriptionId));
    const [dosage, setDosage] = useState(prescription?.dosage || '');
    const [frequency, setFrequency] = useState(prescription?.frequency || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!prescription) {
            dispatch(fetchMedicalHistory(patientId));
        }
    }, [dispatch, prescription, patientId]);

    const handleSave = async () => {
        setLoading(true);
        await dispatch(updatePrescription({ prescriptionId, dosage, frequency })).unwrap();
        setLoading(false);
        navigation.goBack();
    };

    if (!prescription) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.heading}>{t('editPrescription')}</Text>
            <Text style={GlobalStyles.text}>{prescription.medicalTerm.name}</Text>
            <TextInput
                style={GlobalStyles.input}
                value={dosage}
                onChangeText={setDosage}
                placeholder={t('dosage')}
            />
            <TextInput
                style={GlobalStyles.input}
                value={frequency}
                onChangeText={setFrequency}
                placeholder={t('frequency')}
            />
            <Pressable style={GlobalStyles.button} onPress={handleSave} disabled={loading}>
                <Text style={GlobalStyles.buttonText}>{t('save')}</Text>
            </Pressable>
        </View>
    );
};

export default EditPrescriptionScreen;
