// components/ChatRoom.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { receivedMessage, fetchMessages, setCurrentRoomId } from '../store/slices/chatSlice';
import { RootState } from '../store'; // Import the RootState type from your Redux store
import socket from '../utils/socket';
import { ChatMessage } from '../types/chatRoomTypes';

interface Props {
  roomId: string;
}

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages[roomId] || []);

  useEffect(() => {
    dispatch(fetchMessages(roomId));

    const handleNewMessage = (message: ChatMessage) => {
      if (message.room_id === roomId) {
        dispatch(receivedMessage({ roomId, message }));
      }
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [dispatch, roomId]);

  const renderItem = ({ item }: ListRenderItemInfo<ChatMessage>) => (
    <Text>{item.content.text}</Text>
  );

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.message_id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ChatRoom;
