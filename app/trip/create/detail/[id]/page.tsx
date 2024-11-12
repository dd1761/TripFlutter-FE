// detail/page.tsx
"use client";
import { useEffect, useState } from 'react';
import DefaultLayout from '@/app/components/DefaultLayout';
import CommonHeader from '@/app/components/commons/CommonHeader';
import TripContent from '@/app/components/commons/TripContent';
import NoTripMessage from '@/app/components/commons/NoTripMessage'; // 빈 데이터 메시지 컴포넌트 추가
import { Message } from '@/app/type/type';

const TripDetailPage: React.FC = () => {
  const [trip, setTrip] = useState<Message | null>(null);

  // 로컬스토리지에서 여행 정보 불러오기
  useEffect(() => {
    try {
      const savedTrip = localStorage.getItem('savedTrip');
      if (savedTrip) {
        setTrip(JSON.parse(savedTrip));
      }
    } catch (error) {
      console.error("Error retrieving saved trip:", error);
    }
  }, []);

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={true}>
      <CommonHeader backLink={"/"} headerTitle={"여정 상세 페이지"} />
      {/* 여행 정보가 없을 때는 NoTripMessage 컴포넌트를 표시 */}
      {!trip ? <NoTripMessage /> : <TripContent />}
    </DefaultLayout>
  );
};

export default TripDetailPage;
