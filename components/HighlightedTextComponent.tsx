import React from 'react';
import { Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { MedicalTerm } from '../types/medicalTypes';
import MedicalTermDetailsModal from './MedicalTermDetailsModal';
import { highlightedTextStyles } from "../styles/highlightedTextStyles";

interface HighlightedTextProps {
    text: string;
    medicalTerms: { id: string; synonym: string; termInfo: MedicalTerm }[];
}

const HighlightedTextComponent: React.FC<HighlightedTextProps> = ({ text, medicalTerms }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedTerm, setSelectedTerm] = React.useState<MedicalTerm | null>(null);
    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const handlePressTerm = (medicalTerm: MedicalTerm) => {
        setSelectedTerm(medicalTerm);
        setModalVisible(true);
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1.1,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTerm(null);
    };

    const splitText = text.split(/\b([a-zA-Z0-9-]+)\b/g);

    return (
        <View>
            <Text>
                {splitText.map((word, index) => {
                    const medicalTerm = medicalTerms.find(term => word.toLowerCase() === term.synonym.toLowerCase());
                    return medicalTerm ? (
                        <TouchableOpacity key={index} onPress={() => handlePressTerm(medicalTerm)}>
                            <Animated.View style={[highlightedTextStyles.highlighted, { transform: [{ scale: animatedValue }] }]}>
                                <Text style={highlightedTextStyles.highlightedText}>{word}</Text>
                            </Animated.View>
                        </TouchableOpacity>
                    ) : (
                        <Text key={index} style={highlightedTextStyles.normalText}>{word}</Text>
                    );
                })}
            </Text>
            <MedicalTermDetailsModal
                visible={modalVisible}
                term={selectedTerm}
                onClose={closeModal}
            />
        </View>
    );
};

export default HighlightedTextComponent;