"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SelectField from '@/app/components/commons/SelectField';
import DateRangeField from '@/app/components/commons/DateRangeField';
import CheckboxGroup from '@/app/components/commons/CheckboxGroup';
import RadioGroup from '@/app/components/commons/RadioGroup';
import TextField from '@/app/components/commons/TextField';
import styles from './QuickTripCreation.module.css';

const QuickTripCreation: React.FC = () => {
  const router = useRouter();
  const [region, setRegion] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companions, setCompanions] = useState<string[]>([]);
  const [travelStyle, setTravelStyle] = useState<string[]>([]);
  const [schedulePreference, setSchedulePreference] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const tripDetails = {
      region,
      startDate,
      endDate,
      companions,
      travelStyle,
      schedulePreference,
      budget,
      duration: `${startDate} to ${endDate}`, // 예시로 시작일과 종료일을 duration에 추가
    };

    try {
      // GPT API 호출
      const response = await fetch('/api/gpt/gptSpot', { // '/api/gpt/gptSpot' 엔드포인트로 변경
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ travelInfo: tripDetails }), // travelInfo 객체 전달
      });

      const data = await response.json();
      if (data.assistantMessage) {
        const generatedItinerary = {
          role: 'assistant',
          content: `${data.assistantMessage}`,
          id: Date.now(),
        };
        // 생성된 일정 저장
        localStorage.setItem('generatedItinerary', JSON.stringify(generatedItinerary));
        alert(localStorage.getItem('generatedItinerary'))
        // 여행 생성 페이지로 이동
        router.push('/trip/create');
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <SelectField
          label="떠나고 싶은 도시는?"
          options={['서울', '부산', '제주', '인천', '강원', '경기', '대구', '대전', '광주', '울산', '세종', '충북', '충남', '경북', '경남', '전북', '전남']}
          value={region}
          onChange={setRegion}
        />
        <DateRangeField
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <CheckboxGroup
          label="누구와 떠나나요?"
          options={['혼자', '친구와', '연인과', '배우자와', '아이와', '부모님과', '기타']}
          selectedOptions={companions}
          onOptionChange={(option) =>
            setCompanions((prev) =>
              prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
            )
          }
        />
        <CheckboxGroup
          label="내가 선호하는 여행 스타일은?"
          options={['체험액티비티', 'SNS 핫플레이스', '자연과 함께', '유명 관광지는 필수', '여유롭게 힐링', '문화예술역사', '여행지 느낌 물씬', '쇼핑은 열정적으로', '관광보다는 먹방']}
          selectedOptions={travelStyle}
          onOptionChange={(option) =>
            setTravelStyle((prev) =>
              prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
            )
          }
        />
        <RadioGroup
          label="선호하는 여행 일정은?"
          options={['빼곡한 일정 선호', '널널한 일정 선호']}
          selectedOption={schedulePreference}
          onOptionChange={setSchedulePreference}
        />
        <TextField
          label="예산 (1인 기준)"
          value={budget}
          onChange={setBudget}
          placeholder="예산을 입력해주세요 (₩)"
        />
        <button type="submit" className={styles.submitButton}>여행 생성하기</button>
      </form>
    </div>
  );
};

export default QuickTripCreation;
