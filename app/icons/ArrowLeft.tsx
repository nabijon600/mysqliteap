import React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowLeftIcon({ size = 24, color = 'black', active = false }) {
  const iconColor = active ? '#2196F3' : color;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowLeftIcon;
