import React from 'react';
import styles from './Chat.module.css';

// 텍스트 입력을 담당하는 컴포넌트
const InputField = ({ userMessage, setUserMessage }: { userMessage: string, setUserMessage: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <input
      type="text"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)} // 입력 값 변경 시 상태 업데이트
      className={styles.input}
      placeholder="당신의 여행에 대해 알려주세요..."
    />
  );
};

export default InputField;
