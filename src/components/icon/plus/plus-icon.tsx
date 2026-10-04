import type { FC } from 'react';

import type { IconProps } from '../_base/icon';

export const PlusIcon: FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg
    fill="currentColor"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M12,4 C12.55,4 13,4.45 13,5 L13,11 L19,11 C19.55,11 20,11.45 20,12 C20,12.55 19.55,13 19,13 L13,13 L13,19 C13,19.55 12.55,20 12,20 C11.45,20 11,19.55 11,19 L11,13 L5,13 C4.45,13 4,12.55 4,12 C4,11.45 4.45,11 5,11 L11,11 L11,5 C11,4.45 11.45,4 12,4 Z" />
  </svg>
);
