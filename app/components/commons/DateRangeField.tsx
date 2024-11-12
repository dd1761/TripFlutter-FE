// components/DateRangeField.tsx
import React from 'react';
import styles from './QuickTripCreation.module.css';

interface DateRangeFieldProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateRangeField: React.FC<DateRangeFieldProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>여행 기간</label>
      <div className={styles.dateRange}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className={styles.inputDate}
        />
        <span className={styles.separator}>~</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className={styles.inputDate}
        />
      </div>
    </div>
  );
};

export default DateRangeField;
