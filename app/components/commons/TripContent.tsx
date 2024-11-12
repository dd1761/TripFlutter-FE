// TripContent.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './TripContent.module.css';
import { Message } from '@/app/type/type';
import DayPlan from './DayPlan';
import Button from './Button'; // Button 컴포넌트 임포트

const TripContent = () => {
  const [trip, setTrip] = useState<Message | null>(null);
  const router = useRouter();
  const params = useParams();
  const tripId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  // 여행 일정 데이터를 날짜별로 나누는 함수
  const splitByDays = (content: string) => {
    const dayPattern = /(?:\*\*?\d{1,2}일차:\*\*|일자: \d{1,2}일|\*\*Day\s?\d{1,2}:\*\*|\*\*Day\s?\d{1,2}\*\*|\*\*첫째 날:\*\*|\*\*둘째 날:\*\*|\*\*셋째 날:\*\*|첫째 날:|둘째 날:|셋째 날:|\*\*\d{1,2}일차\s?\(\d{4}-\d{2}-\d{2}\)\*\*)/;
    const parts = content.split(dayPattern).map(part => part.trim()).filter(Boolean);
    return parts;
  };

  // 로컬스토리지에서 여행 데이터를 불러오기
  useEffect(() => {
    const selectedTrip = localStorage.getItem('selectedTrip');
    if (selectedTrip) {
      setTrip(JSON.parse(selectedTrip));
    }
  }, []);

  // tripId를 기반으로 저장된 여행 데이터를 로드
  useEffect(() => {
    if (tripId) {
      const savedTripData = localStorage.getItem('savedTrip');
      if (savedTripData) {
        try {
          const parsedTrips = JSON.parse(savedTripData);
          const selectedTrip = parsedTrips.find((trip: Message) => trip.id === parseInt(tripId));
          if (selectedTrip) {
            setTrip(selectedTrip);
          } else {
            console.error("Trip not found in localStorage.");
          }
        } catch (error) {
          console.error("Error parsing saved trip data:", error);
        }
      }
    }
  }, [tripId]);

  // 여행 일정 저장 함수
  const handleSaveTrip = () => {
    if (!trip || !trip.content) {
      alert('저장할 여행 일정이 없습니다!');
      return;
    }

    const savedTrips = JSON.parse(localStorage.getItem('savedTrip') || '[]');
    const isDuplicate = savedTrips.some((savedTrip: Message) => savedTrip.id === trip.id);
    if (isDuplicate) {
      alert('이미 저장된 여행 일정입니다!');
      return;
    }

    const updatedTrips = [...savedTrips, trip];
    localStorage.setItem('savedTrip', JSON.stringify(updatedTrips));
    alert('여행 일정이 저장되었습니다!');
  };

  if (!trip || !trip.content) {
    return (
      <div className={styles.container}>
        <p>여행 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 여행 일정 콘텐츠를 날짜별로 나누기
  const daySections = splitByDays(trip.content);

  return (
    <div className={styles.container}>
      <div className={styles.tripDetails}>
        {daySections.map((part, index) => {
          const day = `${index}일차`;

          if (index === 0 && !part.includes("- ")) {
            return (
              <div className={styles.assistantMessage} key={index}>
                <div className={styles.introText}>{part}</div> {/* 첫 번째 부분은 인트로 텍스트 */}
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

      <div className={styles.buttonsContainer}>
        {/* Button 컴포넌트로 버튼 처리 */}
        <Button
          buttonText="채팅창으로 돌아가기"
          onClick={() => router.push('/trip/create')}
        />
        <Button
          buttonText="일정 저장하기"
          onClick={handleSaveTrip}
        />
        <Button
          buttonText="저장된 일정 리스트 보기"
          onClick={() => router.push('/trip/create/list')}
        />
      </div>
    </div>
  );
};

export default TripContent;
