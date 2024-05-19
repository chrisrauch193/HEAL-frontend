// src/types/chatTypes.ts
import { UserProfile } from '@src/userTypes';
import { MedicalTerm } from '@src/medicalTypes';

export interface ChatRoom {
    roomId: string;
    roomName: string;
    creationTime: Date;
    participants: UserProfile[];
    messages: ChatMessage[];
}

export interface ChatMessage {
    messageId: string;
    roomId: string;
    senderUserId: string;
    timestamp: string;
    content: ChatMessageContent;
}

export interface ChatMessageContent {
    text: string;
    metadata: ChatMessageContentMetadata;
}

export interface ChatMessageContentMetadata {
    translation: string;
    medicalTerms: {
        id: string;
        synonym: string;
        termInfo: MedicalTerm;
    }[];
}
