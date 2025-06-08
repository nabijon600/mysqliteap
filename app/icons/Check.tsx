import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CheckIconProps = {
  size?: number;
  color?: string;
  active?: boolean;
};

const CheckIcon: React.FC<CheckIconProps> = ({ size = 24, color = 'black', active = false }) => {
  // Agar active bo‘lsa, belgilangan activeColor bo‘yicha bo‘yaladi
  const iconColor = active ? '#4CAF50' : color;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.285 6.709a1 1 0 00-1.414-1.418l-9.192 9.207-4.242-4.243a1 1 0 00-1.415 1.415l5 5a1 1 0 001.414 0l10-10z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default CheckIcon;
