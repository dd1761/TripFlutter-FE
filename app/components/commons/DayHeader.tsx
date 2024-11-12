import React from 'react';
import styles from './Chat.module.css';

const DayHeader = ({ day }: { day: string }) => {
  return (
    <div className={styles.dayHeader}>
      <span className={styles.dayIcon}>📅</span> {day}
    </div>
  );
};

export default DayHeader;
