import React from 'react';
import DayHeader from './DayHeader'; // 새로운 DayHeader 컴포넌트
import ActivityItem from './ActivityItem'; // 새로운 ActivityItem 컴포넌트
import styles from './Chat.module.css';

const DayPlan = ({ content, day }: { content: string, day: string }) => {
  // 활동을 "- " 기준으로 나누고 공백을 제거하여 필터링합니다.
  const activities = content.split(/- /).map(activity => activity.trim()).filter(Boolean);

  return (
    <div>
      {/* DayHeader 컴포넌트로 날짜와 아이콘을 표시 */}
      <DayHeader day={day} />
      
      {/* 활동 리스트 렌더링 */}
      <ul className={styles.activitiesList}>
        {activities.map((activity, index) => (
          // 각 활동을 ActivityItem 컴포넌트를 사용하여 렌더링
          <ActivityItem key={index} activity={activity} />
        ))}
      </ul>
    </div>
  );
};

export default DayPlan;
