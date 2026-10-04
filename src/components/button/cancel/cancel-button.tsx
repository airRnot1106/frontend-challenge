import type { FC, ReactNode } from 'react';

import { CancelIcon } from '../../icon/cancel/cancel-icon';
import { Button } from '../_base/button';
import type { ButtonProps } from '../_base/button';

export type CancelButtonProps = Omit<ButtonProps, 'children' | 'style'> & {
  children: ReactNode;
};

export const CancelButton: FC<CancelButtonProps> = ({ children, ...rest }) => (
  <Button
    style={{
      '--button--bg': 'var(--color-button-normal)',
      '--button--bg-hover': 'var(--color-button-normal-hover)',
      '--button--bg-pressed': 'var(--color-button-normal-pressed)',
      '--button--inline-size': 'var(--size-button-height)',
    }}
    {...rest}
  >
    <CancelIcon aria-hidden size={24} />
    {children}
  </Button>
);
