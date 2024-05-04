// src/types/chatTypes.ts
import { UserProfile } from './userTypes';
import { MedicalTerm } from './medicalTypes';

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
    translations: Record<string, string>;
    medicalTerms: MedicalTerm[];
}
