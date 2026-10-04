import type { FC, ReactNode } from 'react';

import { CheckIcon } from '../../icon/check/check-icon';
import { Button } from '../_base/button';
import type { ButtonProps } from '../_base/button';

export type CheckButtonProps = Omit<ButtonProps, 'children' | 'style'> & {
  children: ReactNode;
};

export const CheckButton: FC<CheckButtonProps> = ({ children, ...rest }) => (
  <Button {...rest}>
    <CheckIcon aria-hidden size={24} />
    {children}
  </Button>
);
