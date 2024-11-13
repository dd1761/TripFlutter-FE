import React from 'react';
import styles from './Chat.module.css';

const ActivityItem = ({ activity }: { activity: string }) => {
  return (
    <li className={styles.activityItem}>
      {/* 활동이 '￦'로 시작하지 않으면 📍 아이콘을 표시 */}
      {!activity.startsWith('￦') && <span className={styles.activityIcon}>📍</span>}
      {activity}
    </li>
  );
};

export default ActivityItem;
