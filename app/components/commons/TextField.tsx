// components/TextField.tsx
import React from 'react';
import styles from './QuickTripCreation.module.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, placeholder }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
      placeholder={placeholder}
    />
  </div>
);

export default TextField;
