// types/chatRoomTypes.ts
import { UserProfile } from './userTypes';

export interface ChatMessageContentMetadataTerm {
    medical_term_id: string;
    medical_term_type: string;
    medical_term_context: string;
    name: string;
    description: string;
    medical_term_links: string[];
}

export interface ChatMessageContentMetadata {
    translations: Record<string, string>;
    medical_terms: ChatMessageContentMetadataTerm[];
}

export interface ChatMessageContent {
    text: string;
    metadata: ChatMessageContentMetadata;
}

export interface ChatMessage {
    message_id: string;
    room_id: string;
    sender_user_id: string;
    timestamp: string;
    content: ChatMessageContent;
}

export interface ChatRoom {
    room_id: string;
    room_name: string;
    creation_time: Date;
    participants: UserProfile[];
    messages: ChatMessage[];
}
