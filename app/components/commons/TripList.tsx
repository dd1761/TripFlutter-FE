// TripList.tsx
import React from 'react';
import { SavedTripCard } from '@/app/components/commons/SavedTripCard';
import { EmptyState } from '@/app/components/commons/EmptyState';
import { Message } from '@/app/type/type';

interface TripListProps {
  savedTrips: Message[];
  onDelete: (id: number) => void;
}

const TripList: React.FC<TripListProps> = ({ savedTrips, onDelete }) => {
  return (
    <div className="trip-list">
      {savedTrips.length === 0 ? (
        <EmptyState /> // 여행 정보가 없을 때 EmptyState를 표시
      ) : (
        savedTrips.map((trip) => (
          <SavedTripCard key={trip.id} trip={trip} onDelete={onDelete} /> // 각 여행 정보에 대해 SavedTripCard 컴포넌트 렌더링
        ))
      )}
    </div>
  );
};

export default TripList;
