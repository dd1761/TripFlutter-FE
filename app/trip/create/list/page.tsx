// TripListPage.tsx
"use client";
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/app/components/DefaultLayout';
import CommonHeader from '@/app/components/commons/CommonHeader';
import TripList from '@/app/components/commons/TripList'; // 새로 생성한 TripList 컴포넌트 가져오기
import { Message } from '@/app/type/type';

const TripListPage: React.FC = () => {
  const [savedTrips, setSavedTrips] = useState<Message[]>([]);

  useEffect(() => {
    // 컴포넌트 마운트 시 localStorage에서 저장된 여행 정보 불러오기
    const savedTripsFromStorage = localStorage.getItem('savedTrip');
    if (savedTripsFromStorage) {
      setSavedTrips(JSON.parse(savedTripsFromStorage)); // 저장된 데이터를 상태로 설정
    }
  }, []);

  // 특정 id의 여행 정보를 삭제하고 localStorage를 업데이트하는 함수
  const handleDelete = (id: number) => {
    const updatedTrips = savedTrips.filter((trip) => trip.id !== id); // 삭제된 여행 정보를 제외한 목록 생성
    setSavedTrips(updatedTrips); // 상태 업데이트
    localStorage.setItem('savedTrip', JSON.stringify(updatedTrips)); // localStorage 업데이트
  };

  return (
    <DefaultLayout top={0} right={0} bottom={0} left={0} nav={true}>
      <CommonHeader backLink={"/"} headerTitle={"저장된 여정 리스트 페이지"} />
      <div className="trip-list-page">
        {/* TripList 컴포넌트에 savedTrips와 handleDelete 전달 */}
        <TripList savedTrips={savedTrips} onDelete={handleDelete} />
      </div>
    </DefaultLayout>
  );
};

export default TripListPage;
