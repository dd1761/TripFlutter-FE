// components/SelectField.tsx
import React from 'react';
import styles from './QuickTripCreation.module.css';

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, value, onChange }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
      <option value="">선택해주세요</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
