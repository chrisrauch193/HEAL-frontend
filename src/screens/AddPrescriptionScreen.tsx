// src/screens/AddPrescriptionScreen.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addPrescription } from '../store/slices/medicalHistorySlice';
import { useTranslation } from 'react-i18next';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Picker } from '@react-native-picker/picker';

const AddPrescriptionScreen = ({ route, navigation }) => {
    const { t } = useTranslation();
    const { conditionId, patientId } = route.params;
    const dispatch = useDispatch();
    const { terms } = useSelector((state: RootState) => state.medicalTerms);
    const prescriptionTerms = terms.filter(term => term.medicalTermType === 'PRESCRIPTION');
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(prescriptionTerms[0]?.medicalTermId);
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleSave = () => {
        const data = { 
            dosage, 
            frequency,
            prescriptionDate: new Date().toISOString().split('T')[0]  // Format date as "YYYY-MM-DD"
        }
        dispatch(addPrescription({ conditionId, selectedPrescriptionId, data}));
        navigation.goBack();
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.heading}>{t('selectPrescription')}</Text>
            <Picker
                selectedValue={selectedPrescriptionId}
                onValueChange={(itemValue) => setSelectedPrescriptionId(itemValue)}
            >
                {prescriptionTerms.map((term) => (
                    <Picker.Item key={term.medicalTermId} label={term.name} value={term.medicalTermId} />
                ))}
            </Picker>
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
            <Pressable style={GlobalStyles.button} onPress={handleSave}>
                <Text style={GlobalStyles.buttonText}>{t('save')}</Text>
            </Pressable>
        </View>
    );
};

export default AddPrescriptionScreen;
