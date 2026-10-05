'use client';

import type { FC } from 'react';

import { PlusButton } from '../../../../components/button/plus/plus-button';
import type { PlusButtonProps } from '../../../../components/button/plus/plus-button';
import { addPage } from '../../actions/add-page';

export type PageAddButtonProps = Omit<PlusButtonProps, 'action'>;

export const PageAddButton: FC<PageAddButtonProps> = (props) => (
  <PlusButton
    action={async () => {
      await addPage();
    }}
    {...props}
  />
);
