"use client"
import React from 'react';
import { Message } from '@/app/type/type';
import { useRouter } from 'next/navigation';
import Button from './Button';  // Button 컴포넌트 import
import styles from './SavedTripCard.module.css';

interface SavedTripCardProps {
  trip: Message;
  onDelete: (id: number) => void;
}

export const SavedTripCard: React.FC<SavedTripCardProps> = ({ trip, onDelete }) => {
  const router = useRouter();

  // 일정 상세보기: 상세 페이지로 이동
  const handleViewDetails = () => {
    if (trip.id) {
      router.push(`/trip/create/detail/${trip.id}`); // trip ID로 상세 페이지로 이동
    } else {
      console.error("일정 ID가 없습니다!");
    }
  };

  // 일정 삭제: 삭제 동작 수행
  const handleDelete = () => {
    if (trip.id) {
      onDelete(trip.id); // 부모 컴포넌트에서 전달받은 onDelete 함수 호출
    } else {
      console.error("일정 id가 다릅니다!");
    }
  };

  // 채팅창으로 돌아가기: 채팅 화면으로 돌아가기
  const handleBackToChat = () => {
    router.push('/trip/create'); // 채팅창으로 이동
  };

  return (
    <div className={styles.tripCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{trip.content.split("\n")[0]}</h3> {/* 여행 내용에서 첫 번째 줄을 제목으로 표시 */}
        <p className={styles.cardExcerpt}>{trip.content.slice(0, 100)}...</p> {/* 내용의 일부를 잘라서 미리보기 */}
      </div>
      
      <div className={styles.buttonGroup}>
        {/* 버튼 컴포넌트 재사용 */}
        <Button buttonText="일정 상세보기" onClick={handleViewDetails} />
        <Button buttonText="일정 삭제하기" onClick={handleDelete} />
        <Button buttonText="채팅창으로 돌아가기" onClick={handleBackToChat} />
      </div>
    </div>
  );
};
