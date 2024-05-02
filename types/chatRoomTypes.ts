import { UserProfile } from './userTypes';

export interface ChatMessage {
    id: string;
    senderUserId: string;
    content: string;
    timestamp: Date;
}

export interface ChatRoom {
    room_id: string;
    room_name: string;
    creation_time: Date;
    participants: UserProfile[];
    messages: ChatMessage[];
}
