import type { FC, ReactNode } from 'react';

import { EditIcon } from '../../icon/edit/edit-icon';
import { Button } from '../_base/button';
import type { ButtonProps } from '../_base/button';

export type EditButtonProps = Omit<ButtonProps, 'children' | 'style'> & {
  children: ReactNode;
};

export const EditButton: FC<EditButtonProps> = ({ children, ...rest }) => (
  <Button {...rest}>
    <EditIcon aria-hidden size={24} />
    {children}
  </Button>
);
