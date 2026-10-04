import type { FC } from 'react';

import type { IconProps } from '../_base/icon';

export const CheckIcon: FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg
    fill="currentColor"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M4,4 C5.05,4 5.92,4.82 5.99,5.85 L6,6 L6,12 L20,12 C21.05,12 21.92,12.82 21.99,13.85 L22,14 C22,15.05 21.18,15.92 20.15,15.99 L20,16 L4,16 C2.95,16 2.08,15.18 2.01,14.15 L2,14 L2,6 C2,4.9 2.9,4 4,4 Z"
      transform="translate(12, 10) rotate(-50) translate(-12, -10)"
    />
  </svg>
);
