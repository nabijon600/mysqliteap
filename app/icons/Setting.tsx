import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SettingsIcon({ size = 24, color = 'black', active = false }) {
  const iconColor = active ? '#2196F3' : color;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.591 1.03c1.53-.941 3.39.919 2.45 2.45a1.724 1.724 0 0 0 1.03 2.591c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.03 2.591c.941 1.53-.919 3.39-2.45 2.45a1.724 1.724 0 0 0-2.591 1.03c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.591-1.03c-1.53.941-3.39-.919-2.45-2.45a1.724 1.724 0 0 0-1.03-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.03-2.591c-.941-1.53.919-3.39 2.45-2.45a1.724 1.724 0 0 0 2.591-1.03z"
        stroke={iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        stroke={iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SettingsIcon;
