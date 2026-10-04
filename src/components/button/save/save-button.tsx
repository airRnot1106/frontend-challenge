import type { FC, ReactNode } from 'react';

import { SaveIcon } from '../../icon/save/save-icon';
import { Button } from '../_base/button';
import type { ButtonProps } from '../_base/button';

export type SaveButtonProps = Omit<ButtonProps, 'children' | 'style'> & {
  children: ReactNode;
};

export const SaveButton: FC<SaveButtonProps> = ({ children, ...rest }) => (
  <Button
    style={{
      '--button--inline-size': 'var(--size-button-height)',
    }}
    {...rest}
  >
    <SaveIcon aria-hidden size={24} />
    {children}
  </Button>
);
