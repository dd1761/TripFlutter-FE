import React from 'react';
import styles from './Button.module.css';

// Button 컴포넌트: 텍스트와 클릭 이벤트를 props로 받습니다.
const Button = ({ buttonText, onClick, customClass }: { buttonText: string, onClick: () => void, customClass?: string }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${customClass}`}>
      {buttonText}
    </button>
  );
};

export default Button;
