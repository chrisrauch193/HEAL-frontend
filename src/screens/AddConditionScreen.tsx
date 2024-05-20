// src/screens/AddConditionScreen.tsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addCondition } from '../store/slices/medicalHistorySlice';
import { useTranslation } from 'react-i18next';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Picker } from '@react-native-picker/picker';

const AddConditionScreen = ({ route, navigation }) => {
    const { t } = useTranslation();
    const { patientId } = route.params;
    const dispatch = useDispatch();
    const { terms } = useSelector((state: RootState) => state.medicalTerms);
    const conditionTerms = terms.filter(term => term.medicalTermType === 'CONDITION');
    const [selectedConditionId, setSelectedConditionId] = useState(conditionTerms[0]?.medicalTermId);


    const handleSave = () => {
        const data = { 
            status: 'current', 
            diagnosisDate: new Date().toISOString().split('T')[0]  // Format date as "YYYY-MM-DD"
        };
        dispatch(addCondition({ patientId, selectedConditionId, data }));
        navigation.goBack();
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.heading}>{t('selectCondition')}</Text>
            <Picker
                selectedValue={selectedConditionId}
                onValueChange={(itemValue) => setSelectedConditionId(itemValue)}
            >
                {conditionTerms.map((term) => (
                    <Picker.Item key={term.medicalTermId} label={term.name} value={term.medicalTermId} />
                ))}
            </Picker>
            <Pressable style={GlobalStyles.button} onPress={handleSave}>
                <Text style={GlobalStyles.buttonText}>{t('save')}</Text>
            </Pressable>
        </View>
    );
};

export default AddConditionScreen;
