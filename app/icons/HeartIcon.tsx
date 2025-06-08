import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props: {active?: boolean}) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      {props.active ? (
        <Path
          d="M12.841 3.891L12 4.805l-.842-.914c-2.323-2.521-6.091-2.521-8.415 0-2.324 2.522-2.324 6.611 0 9.133l7.574 8.22c.93 1.008 2.437 1.008 3.366 0l7.574-8.22c2.324-2.522 2.324-6.61 0-9.133-2.324-2.521-6.092-2.521-8.416 0z"
          fill="#1F8B24"
        />
      ) : (
        <Path
          d="M12.765 4.702L12 5.524l-.765-.822c-2.113-2.27-5.538-2.27-7.65 0-2.113 2.27-2.113 5.95 0 8.22l6.885 7.397a2.06 2.06 0 003.06 0l6.886-7.397c2.112-2.27 2.112-5.95 0-8.22-2.113-2.27-5.538-2.27-7.651 0z"
          stroke="#000"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

SvgComponent.defaultProps = {
  active: false,
};

export default SvgComponent;