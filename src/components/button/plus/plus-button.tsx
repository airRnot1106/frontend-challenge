import type { FC, ReactNode } from 'react';

import { PlusIcon } from '../../icon/plus/plus-icon';
import { Button } from '../_base/button';
import type { ButtonProps } from '../_base/button';

export type PlusButtonProps = Omit<ButtonProps, 'children' | 'style'> & {
  children: ReactNode;
};

export const PlusButton: FC<PlusButtonProps> = ({ children, ...rest }) => (
  <Button
    style={{
      '--button--bg': 'var(--color-button-secondary)',
      '--button--bg-hover': 'var(--color-button-secondary-hover)',
      '--button--bg-pressed': 'var(--color-button-secondary-pressed)',
      '--button--border-color': 'var(--color-button-secondary-line)',
      '--button--color': 'var(--color-button-secondary-line)',
    }}
    {...rest}
  >
    <PlusIcon aria-hidden size={24} />
    {children}
  </Button>
);
