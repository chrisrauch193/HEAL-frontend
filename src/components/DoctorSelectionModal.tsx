// src/components/DoctorSelectionModal.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors, assignSecondOpinionDoctor } from '../store/slices/userSlice';
import { RootState } from '../store';
import { DoctorSelectionModalStyles } from '../styles/DoctorSelectionModalStyles';
import { useTranslation } from 'react-i18next';

interface DoctorSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    roomId: string;
}

const DoctorSelectionModal: React.FC<DoctorSelectionModalProps> = ({ visible, onClose, roomId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const doctors = useSelector((state: RootState) => state.user.doctors);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            dispatch(fetchDoctors());
        }
    }, [visible, dispatch]);

    const handleSelectDoctor = async (doctorId: string) => {
        setLoading(true);
        try {
            await dispatch(assignSecondOpinionDoctor({ roomId, doctorId }));
            Alert.alert(t('success'), t('secondOpinionRequested'));
            onClose();
        } catch (error) {
            Alert.alert(t('error'), t('errorRequestingSecondOpinion'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={DoctorSelectionModalStyles.container}>
                <View style={DoctorSelectionModalStyles.content}>
                    <Text style={DoctorSelectionModalStyles.title}>{t('selectDoctor')}</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            data={doctors}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable style={DoctorSelectionModalStyles.item} onPress={() => handleSelectDoctor(item.id)}>
                                    <Text style={DoctorSelectionModalStyles.itemText}>{item.name}</Text>
                                </Pressable>
                            )}
                        />
                    )}
                    <Pressable style={DoctorSelectionModalStyles.closeButton} onPress={onClose}>
                        <Text style={DoctorSelectionModalStyles.closeButtonText}>{t('close')}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default DoctorSelectionModal;
