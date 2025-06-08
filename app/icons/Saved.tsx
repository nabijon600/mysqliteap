import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SavedIcon({ size = 24, color = 'black', active = false }) {
  // Agar active bo‘lsa, belgilangan activeColor bo‘yicha bo‘yaladi
  const iconColor = active ? '#FF5722' : color;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z"
        stroke={iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SavedIcon;
