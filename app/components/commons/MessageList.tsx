import React from 'react';
import { Message } from '@/app/type/type';
import ChatMessage from './ChatMessage'; // ChatMessage 컴포넌트 import

// 메시지 리스트를 출력하는 컴포넌트
const MessageList = ({ 
  messages, 
  onSave, 
  onRegenerate 
}: { 
  messages: Message[]; 
  onSave: (message: Message) => void; 
  onRegenerate: () => void; 
}) => {
  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage 
          key={index} 
          message={message} 
          onSave={() => onSave(message)} 
          onRegenerate={onRegenerate} 
        />
      ))}
    </>
  );
};

export default MessageList;
