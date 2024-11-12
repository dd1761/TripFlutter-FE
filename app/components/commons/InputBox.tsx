import React from 'react';
import InputField from './InputField'; // 새로 분리된 InputField 컴포넌트
import Button from './Button'; // 새로 분리된 Button 컴포넌트
import styles from './Chat.module.css';

const InputBox = ({ userMessage, setUserMessage, sendMessage }: { userMessage: string, setUserMessage: React.Dispatch<React.SetStateAction<string>>, sendMessage: () => void }) => {
  return (
    <div className={styles.inputBox}>
      {/* InputField 컴포넌트로 텍스트 입력 처리 */}
      <InputField userMessage={userMessage} setUserMessage={setUserMessage} />
      {/* "보내기" 버튼에만 sendButton 스타일 적용 */}
      <Button buttonText="보내기" onClick={sendMessage} />
    </div>
  );
};

export default InputBox;
