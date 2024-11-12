// components/RadioGroup.tsx
import React from 'react';
import styles from './QuickTripCreation.module.css';

interface RadioGroupProps {
  label: string;
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, options, selectedOption, onOptionChange }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    <div className={styles.options}>
      {options.map((option) => (
        <label key={option} className={styles.radioLabel}>
          <input
            type="radio"
            name={label}
            checked={selectedOption === option}
            onChange={() => onOptionChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroup;
