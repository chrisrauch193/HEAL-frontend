import React from 'react';
import { Text, TextStyle, View } from 'react-native';

interface HighlightedTextProps {
    text: string;
    medicalTerms: string[];
    style: TextStyle;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, medicalTerms, style }) => {
    const splitText = text.split(new RegExp(`\\b(${medicalTerms.join('|')})\\b`, 'gi'));

    return (
        <Text>
            {splitText.map((word, index) => {
                const isMedicalTerm = medicalTerms.some(term => word.toLowerCase() === term.toLowerCase());
                return isMedicalTerm ? <Text key={index} style={style}>{word}</Text> : <Text key={index}>{word}</Text>;
            })}
        </Text>
    );
};

export default HighlightedText;
