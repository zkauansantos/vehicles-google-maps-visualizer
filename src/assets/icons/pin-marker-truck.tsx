import { memo } from "react";

import { generateRandomPinColor } from "@/utils/colors";

function PinMarkerTruckComponent() {
  const color = generateRandomPinColor();

  return (
    <svg
      width="41"
      height="63"
      viewBox="0 0 41 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
    >
      <circle cx="20.5" cy="20.5" r="20.5" />
      <circle
        cx="20.5"
        cy="20.5"
        r="16.9531"
        stroke="white"
        strokeWidth="1.09375"
      />
      <circle cx="19.9999" cy="19.9998" r="7.46667" />
      <g clipPath="url(#clip0_1_273)">
        <path
          d="M29 18H26V14H12C10.9 14 10 14.9 10 16V27H12C12 28.66 13.34 30 15 30C16.66 30 18 28.66 18 27H24C24 28.66 25.34 30 27 30C28.66 30 30 28.66 30 27H32V22L29 18ZM28.5 19.5L30.46 22H26V19.5H28.5ZM15 28C14.45 28 14 27.55 14 27C14 26.45 14.45 26 15 26C15.55 26 16 26.45 16 27C16 27.55 15.55 28 15 28ZM17.22 25C16.67 24.39 15.89 24 15 24C14.11 24 13.33 24.39 12.78 25H12V16H24V25H17.22ZM27 28C26.45 28 26 27.55 26 27C26 26.45 26.45 26 27 26C27.55 26 28 26.45 28 27C28 27.55 27.55 28 27 28Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter0_d_1_273)">
        <path d="M21.366 46.5C20.9811 47.1667 20.0189 47.1667 19.634 46.5L15.7369 39.75C15.352 39.0833 15.8331 38.25 16.6029 38.25H24.3971C25.1669 38.25 25.648 39.0833 25.2631 39.75L21.366 46.5Z" />
      </g>
      <defs>
        <filter
          id="filter0_d_1_273"
          x="3.70144"
          y="30.35"
          width="33.5971"
          height="32.55"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5.95" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.319661 0 0 0 0 0.319661 0 0 0 0 0.319661 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_273"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_273"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1_273">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(9 10)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export const PinMarkerTruck = memo(PinMarkerTruckComponent);
