import type { FC } from 'react';

import type { IconProps } from '../_base/icon';

export const CancelIcon: FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg
    fill="currentColor"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M0.61,-0.79 L0.71,-0.71 L6,4.58 L11.29,-0.71 C11.68,-1.1 12.32,-1.1 12.71,-0.71 C13.07,-0.35 13.1,0.22 12.79,0.61 L12.71,0.71 L7.41,6 L12.71,11.29 C13.1,11.68 13.1,12.32 12.71,12.71 C12.35,13.07 11.78,13.1 11.39,12.79 L11.29,12.71 L6,7.41 L0.71,12.71 C0.32,13.1 -0.32,13.1 -0.71,12.71 C-1.07,12.35 -1.1,11.78 -0.79,11.39 L-0.71,11.29 L4.58,6 L-0.71,0.71 C-1.1,0.32 -1.1,-0.32 -0.71,-0.71 C-0.38,-1.04 0.13,-1.09 0.51,-0.86 L0.61,-0.79 Z"
      transform="translate(6, 6)"
    />
  </svg>
);
