import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return (
    <SVG viewBox="25 25 50 50">
      <CIRCLE r="20" cy="50" cx="50"></CIRCLE>
    </SVG>
  );
};

const rotate4 = keyframes`
  100% {
  transform: rotate(360deg);
 }
`;

const dash4 = keyframes`
   0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
`;

const SVG = styled.svg`
  width: 3.25em;
  transform-origin: center;
  animation: ${rotate4} 2s linear infinite;
`;

const CIRCLE = styled.circle`
  fill: none;
  stroke: hsl(214, 97%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ${dash4} 1.5s ease-in-out infinite;
`;

export default LoadingSpinner;
