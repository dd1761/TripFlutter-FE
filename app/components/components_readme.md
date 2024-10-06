# Descriptions for app/components directory

## 목적

- 본 디렉토리는 페이지 전역에서 사용될 공통 컴포넌트들을 관리하기 위한 디렉토리입니다.
- 버튼, 데이터 테이블 등 공통적으로 사용될 컴포넌트들을 이 곳에 정의해주시면 되겠습니다.

## 규칙

- 컴포넌트 파일 명은 대문자로 시작하는 Upper Camel Case로 작성 부탁드립니다.
- 컴포넌트 파일에서 Export 되는 함수형 컴포넌트는 React.FC 타입 정의 부탁드립니다.
- useState를 사용해야 하는 컴포넌트는 "use client"; 를 선언 부탁드립니다.
