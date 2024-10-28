"use client";
import { COLORS } from "@/public/styles/colors";
import React from "react";
import styled from "styled-components";

interface SVGProps {
  color?: string;
  width: number;
  height: number;
}

// 종이 비행기 아이콘
export const PaperPlane: React.FC<SVGProps> = ({ color, width, height }) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
        fill={color}
      />
    </SVG>
  );
};

// 커뮤니티 아이콘
export const Community: React.FC<SVGProps> = ({ color, width, height }) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 640 512"
      fill="none"
    >
      <path
        d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"
        fill={color}
      />
    </SVG>
  );
};

// 홈 아이콘
export const GoHome: React.FC<SVGProps> = ({ color, width, height }) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 576 512"
      fill="none"
    >
      <path
        d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
        fill={color}
      />
    </SVG>
  );
};

// 내 여행 아이콘
export const Suitcase: React.FC<SVGProps> = ({ color, width, height }) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 384 512"
      fill="none"
    >
      <path
        d="M144 56c0-4.4 3.6-8 8-8l80 0c4.4 0 8 3.6 8 8l0 72-96 0 0-72zm176 72l-32 0 0-72c0-30.9-25.1-56-56-56L152 0C121.1 0 96 25.1 96 56l0 72-32 0c-35.3 0-64 28.7-64 64L0 416c0 35.3 28.7 64 64 64c0 17.7 14.3 32 32 32s32-14.3 32-32l128 0c0 17.7 14.3 32 32 32s32-14.3 32-32c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64zM112 224l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 128l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
        fill={color}
      />
    </SVG>
  );
};

// 유저 아이콘
export const UserIcon: React.FC<SVGProps> = ({ color, width, height }) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 448 512"
      fill="none"
    >
      <path
        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
        fill={color}
      />
    </SVG>
  );
};

// 뒤로 가기 아이콘
export const ArrowLeft: React.FC<SVGProps> = ({ color, width, height }) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.65232 13.946C9.11543 14.4163 9.11543 15.1777 8.65232 15.648C8.1892 16.1176 7.43879 16.1183 6.97498 15.648L0.347339 8.85132C-0.11578 8.38105 -0.11578 7.61895 0.347339 7.14868L6.97498 0.352703C7.43879 -0.117568 8.1885 -0.117568 8.65232 0.352703C9.11543 0.822974 9.11543 1.58438 8.65232 2.05465L3.21708 8.00017L8.65232 13.946Z"
        fill={color}
      />
    </SVG>
  );
};
const SVG = styled.svg`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
`;
