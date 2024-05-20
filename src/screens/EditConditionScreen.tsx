// src/screens/EditConditionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchMedicalHistory, updateCondition } from '../store/slices/medicalHistorySlice';
import { useTranslation } from 'react-i18next';

const EditConditionScreen = ({ route, navigation }) => {
    const { t } = useTranslation();
    const { conditionId, patientId } = route.params;
    const dispatch = useDispatch();
    const condition = useSelector((state: RootState) => state.medicalHistory.conditions.find(c => c.userConditionId === conditionId));
    const [status, setStatus] = useState(condition?.status || '');

    useEffect(() => {
        if (!condition) {
            dispatch(fetchMedicalHistory(patientId));
        }
    }, [dispatch, condition, patientId]);

    const handleSave = () => {
        dispatch(updateCondition({ conditionId, patientId, status }));
        navigation.goBack();
    };

    if (!condition) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <Text>{t('editCondition')}</Text>
            <Text>{condition.medicalTerm.name}</Text>
            <TextInput value={status} onChangeText={setStatus} />
            <Button title={t('save')} onPress={handleSave} />
        </View>
    );
};

export default EditConditionScreen;
