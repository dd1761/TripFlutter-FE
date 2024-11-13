// components/CheckboxGroup.tsx
import React from 'react';
import styles from './QuickTripCreation.module.css';

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selectedOptions, onOptionChange }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    <div className={styles.options}>
      {options.map((option) => (
        <label key={option} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => onOptionChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default CheckboxGroup;
