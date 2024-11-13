"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Message } from '@/app/type/type';
import MessageList from './MessageList';
import InputBox from './InputBox';
import styles from './Chat.module.css';

// localStorage에서 메시지를 읽어오는 유틸리티 함수
const getMessagesFromLocalStorage = (): Message[] => {
  const savedMessages = localStorage.getItem('messages');
  return savedMessages ? JSON.parse(savedMessages) : [];
};

// 메시지를 localStorage에 저장하는 유틸리티 함수
const saveMessagesToLocalStorage = (messages: Message[]) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

// localStorage에서 저장된 여행 데이터를 읽어오는 유틸리티 함수
const getSavedTripsFromLocalStorage = (): Message[] => {
  const savedTrips = localStorage.getItem('savedTrip');
  return savedTrips ? JSON.parse(savedTrips) : [];
};

// 여행 데이터를 localStorage에 저장하는 유틸리티 함수
const saveTripsToLocalStorage = (savedTrips: Message[]) => {
  localStorage.setItem('savedTrip', JSON.stringify(savedTrips));
};

// localStorage에서 생성된 여행 일정을 가져오는 유틸리티 함수
const getGeneratedItineraryFromLocalStorage = (): Message | null => {
  const generatedItinerary = localStorage.getItem('generatedItinerary');
  return generatedItinerary ? JSON.parse(generatedItinerary) : null;
};

const Chat = () => {
  const router = useRouter();
  const [userMessage, setUserMessage] = useState<string>('');  // 사용자가 입력한 메시지
  const [messages, setMessages] = useState<Message[]>([]);  // 메시지 리스트
  const [savedTrips, setSavedTrips] = useState<Message[]>([]);  // 저장된 여행 리스트
  const [lastUserMessage, setLastUserMessage] = useState<string>('');  // 마지막 사용자 메시지
  const [generatedItinerary, setGeneratedItinerary] = useState<Message | null>(null);  // 생성된 여행 일정

  // 컴포넌트가 처음 마운트될 때 localStorage에서 메시지와 저장된 여행 데이터 로드
  useEffect(() => {
    const loadedMessages = getMessagesFromLocalStorage();
    setMessages(loadedMessages);
    const trips = getSavedTripsFromLocalStorage();
    setSavedTrips(trips);
    
    // 생성된 여행 일정이 있으면 로드하여 messages에 추가
    const itinerary = getGeneratedItineraryFromLocalStorage();
    if (itinerary) {
      setGeneratedItinerary(itinerary);
      setMessages((prevMessages) => [...prevMessages, itinerary]);
    }
  }, []);

  // GPT로 메시지를 전송하고 응답을 받는 함수
  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    // 새로운 메시지 리스트 생성
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setLastUserMessage(userMessage); // 마지막 사용자 메시지 저장
    setUserMessage('');

    // 메시지를 localStorage에 저장
    saveMessagesToLocalStorage(newMessages);

    try {
      // GPT API 호출
      const response = await fetch('/api/gpt/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }),
      });

      const data = await response.json();
      if (data.assistantMessage) {
        const assistantMessage: Message = {
          id: Date.now(),
          role: 'assistant',
          content: `${data.assistantMessage}`
        };
        setMessages([...newMessages, assistantMessage]);

        // 응답 메시지도 localStorage에 저장
        saveMessagesToLocalStorage([...newMessages, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 여행을 저장하는 함수
  const saveTrip = (message: Message) => {
    // 중복 저장 확인
    const isDuplicate = savedTrips.some((trip) => trip.id === message.id && trip.content === message.content);
    if (isDuplicate) {
      alert('일정이 이미 저장되었어요!');
      return;
    }

    const newSavedTrips = [...savedTrips, message];
    setSavedTrips(newSavedTrips);

    // 저장된 여행을 localStorage에 저장
    saveTripsToLocalStorage(newSavedTrips);

    alert('일정이 저장되었어요!');
    
    // 여행 상세 페이지로 이동, 여행 ID를 URL에 전달
    router.push(`/trip/create/detail/${message.id}`);
  };

  // GPT 응답을 다시 받는 함수
  const regenerateResponse = async () => {
    try {
      // GPT API 호출
      const response = await fetch('/api/gpt/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: lastUserMessage }),
      });

      const data = await response.json();
      if (data.assistantMessage) {
        const assistantMessage: Message = {
          id: Date.now(),
          role: 'assistant',
          content: `${data.assistantMessage}`
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        saveMessagesToLocalStorage([...messages, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        <div className={styles.assistantMessage}>안녕하세요! 무엇을 도와드릴까요?</div>
        <MessageList 
          messages={messages} 
          onSave={saveTrip} 
          onRegenerate={regenerateResponse} 
        />
      </div>
      <InputBox userMessage={userMessage} setUserMessage={setUserMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
