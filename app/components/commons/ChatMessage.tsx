import React from 'react';
import { Message } from '@/app/type/type';
import { useRouter } from 'next/navigation';
import DayPlan from './DayPlan';
import Button from './Button'; // 버튼 컴포넌트 import
import styles from './Chat.module.css';

// 일정 상세보기 버튼 클릭 시, 여행 정보를 localStorage에 저장하고 상세 페이지로 이동하는 함수
const handleViewDetails = (message: Message, router: any) => {
  if (message.id) {
    localStorage.setItem('selectedTrip', JSON.stringify(message));
    router.push(`/trip/create/detail/${message.id}`);
  } else {
    alert('일정 ID가 없습니다!');
  }
};

// 어시스턴트 메시지를 렌더링하는 컴포넌트
const AssistantMessage = ({ content }: { content: string }) => {
    const parts = content.split(
        /\*\*?\d{1,2}일차:\*\*|일자: \d{1,2}일|\*\*Day\s?\d{1,2}:\*\*|\*\*Day\s?\d{1,2}\*\*|\*\*첫째 날:\*\*|\*\*둘째 날:\*\*|\*\*셋째 날:\*\*|첫째 날:|둘째 날:|셋째 날:|\*\*\d{1,2}일차\s?\(\d{4}-\d{2}-\d{2}\)\*\*/)
        .map(day => day.trim())  // 각 부분을 공백을 기준으로 잘라서 트림
        .filter(Boolean);  // 빈 문자열 제거

  return (
    <div>
      {parts.map((part, index) => {
        const day = `${index}일차`; // 첫 번째 날짜는 1일차로 표시

        if (index === 0 && !part.includes("- ")) {
          return (
            <div className={styles.assistantMessage} key={index}>
              <div className={styles.introText}>{part}</div> {/* introText 스타일 적용 */}
            </div>
          );
        }

        return (
          <div className={styles.daySection} key={index}>
            <DayPlan content={part} day={day} />
          </div>
        );
      })}
    </div>
  );
};

// ChatMessage 컴포넌트
const ChatMessage = ({ message, onSave, onRegenerate }: { message: Message, onSave: () => void, onRegenerate: () => void }) => {
  const router = useRouter();

  return (
    <div className={message.role === 'user' ? styles.userMessage : styles.assistantMessage}>
      {message.role === 'assistant' ? <AssistantMessage content={message.content} /> : message.content}

      {message.role === 'assistant' && (
        <div className={styles.buttonGroup}>
          {/* 버튼 컴포넌트 렌더링 */}
          <Button buttonText="일정 상세보기" onClick={() => handleViewDetails(message, router)} />
          <Button buttonText="일정 저장하기" onClick={onSave} />
          <Button buttonText="일정 다시 추천받기" onClick={onRegenerate} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
