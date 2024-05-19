// mock/server.ts
import MockAdapter from 'axios-mock-adapter';
import { UserProfile } from '@types/userTypes';
import { ChatRoom, ChatMessage } from '@types/chatTypes';
import { MedicalTerm } from '@types/medicalTypes';

export default function applyMockAdapter(axiosInstance) {
    const mock = new MockAdapter(axiosInstance);

    // Sample user profile data
    const userProfileData: UserProfile = {
        userId: "1",
        type: "PATIENT",
        email: "email@gmail.com",
        name: "John Doe",
        dateOfBirth: "1990-12-25",
        language: "en",
        height: 190,
        weight: 115
    };

    const doctorSmith: UserProfile = {
        userId: "2",
        type: "DOCTOR",
        email: "doctor@gmail.com",
        name: "Dr. Smith",
        dateOfBirth: "1980-02-15",
        language: "jp",
        hospital: "Kyoto University Hospital",
        specialisation: "Cardiology"
    };

    const doctorJones: UserProfile = {
        userId: "3",
        type: "DOCTOR",
        email: "english_doctor@gmail.com",
        name: "Dr. Jones",
        dateOfBirth: "1985-05-10",
        language: "en",
        hospital: "St Pauls Hospital",
        specialisation: "Cardiology"
    };

    const medicalTermCOVID19: MedicalTerm = {
        medicalTermId: "1",
        medicalTermType: "CONDITION",
        name: "COVID-19",
        description: "COVID-19 is a severe respiratory disease caused by a novel coronavirus.",
        medicalTermLinks: ["https://www.nhs.uk/conditions/coronavirus-covid-19/", "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"]
    };

    const message1: ChatMessage = {
        messageId: "1",
        roomId: "12345",
        senderUserId: "1",
        timestamp: "2023-04-12T14:00:00Z",
        content: {
            text: "Hi, I've lost my sense of taste and I'm coughing a lot.",
            metadata: {
                translations: {
                    jp: "こんにちは、私は味覚を失い、よく咳をしています。"
                },
                medicalTerms: []
            }
        }
    };

    const message2: ChatMessage = {
        messageId: "2",
        roomId: "12345",
        senderUserId: "2",
        timestamp: "2023-04-12T14:30:00Z",
        content: {
            text: "新型コロナウイルス感染症に感染している場合は家にいてください",
            metadata: {
                translations: {
                    en: "You have COVID-19 please stay home."
                },
                medicalTerms: [medicalTermCOVID19]
            }
        }
    };

    // Sample chat room data
    const chatRoomData: ChatRoom = {
        roomId: "12345",
        roomName: "Consultation 1",
        creationTime: new Date("2023-04-12T14:00:00Z"),
        participants: [
            userProfileData,
            doctorSmith
        ],
        messages: [message1, message2]
    };

    // Mock verify token endpoint
    mock.onGet('/users/verify-token').reply(200, userProfileData);

    // Mock login endpoint
    mock.onPost('/users/login').reply(200, {
        user: userProfileData,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiO"
    });

    // Mock register user endpoint
    mock.onPost('/users/register').reply(201, userProfileData);

    // Mock fetch user profile endpoint
    mock.onGet(`/users/${userProfileData.userId}`).reply(200, userProfileData);
    mock.onGet(`/users/${doctorSmith.userId}`).reply(200, doctorSmith);
    mock.onGet(`/users/${doctorJones.userId}`).reply(200, doctorJones);

    // Mock update user profile endpoint
    mock.onPut(`/users/${userProfileData.userId}`).reply(200, {
        ...userProfileData,
        email: "new_email@gmail.com"
    });

    // Mock create chat room
    mock.onPost('/chats/new').reply(201, {
        roomId: chatRoomData.roomId,
    });

    // Mock get chat room details
    mock.onGet(`/chats/${chatRoomData.roomId}`).reply(200, chatRoomData);

    // Mock delete chat room
    mock.onDelete(`/chats/${chatRoomData.roomId}`).reply(204);

    // Mock add participant to chat room
    mock.onPost(`/chats/${chatRoomData.roomId}/participants/3`).reply(201, {
        ...chatRoomData,
        participants: [
            ...chatRoomData.participants,
            doctorJones
        ]
    });

    // Mock remove participant from chat room
    mock.onDelete(`/chats/${chatRoomData.roomId}/participants/3`).reply(200, {
        ...chatRoomData,
        participants: chatRoomData.participants.filter(participant => participant.userId !== "3")
    });

    // Mock get user chat rooms
    mock.onGet(`/users/${userProfileData.userId}/chats`).reply(200, {
        rooms: [chatRoomData, {
            ...chatRoomData,
            roomId: "12346",
            roomName: "Consultation 2",
            creationTime: new Date("2023-04-13T14:00:00Z"),
        }]
    });

    // Mock get chat room messages
    mock.onGet(`/chats/${chatRoomData.roomId}/messages`).reply(200, {
        messages: chatRoomData.messages
    });

    // Mock any other requests
    mock.onAny().reply(501, {
        error: "Internal Server Error"
    });
}
