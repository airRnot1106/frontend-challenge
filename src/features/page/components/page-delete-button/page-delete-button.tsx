'use client';

import type { FC } from 'react';

import { Button } from '../../../../components/button/_base/button';
import type { ButtonProps } from '../../../../components/button/_base/button';
import { DeleteIcon } from '../../../../components/icon/delete/delete-icon';
import { deletePage } from '../../actions/delete-page';

export type PageDeleteButtonProps = Omit<
  ButtonProps,
  'action' | 'aria-label' | 'children' | 'style'
> & {
  'aria-label': string;
  pageId: number;
};

export const PageDeleteButton: FC<PageDeleteButtonProps> = ({
  pageId,
  ...rest
}) => (
  <Button
    action={async () => {
      await deletePage(pageId);
    }}
    style={{
      '--button--bg': 'transparent',
      '--button--bg-hover': 'var(--color-icon-button-hover)',
      '--button--bg-pressed': 'var(--color-icon-button-pressed)',
      '--button--block-size': 'calc(var(--size-icon) + var(--space-2xs) * 2)',
      '--button--color': 'var(--color-icon-button-icon)',
      '--button--inline-size': 'calc(var(--size-icon) + var(--space-2xs) * 2)',
      '--button--padding-inline': '0',
    }}
    {...rest}
  >
    <DeleteIcon aria-hidden size={24} />
  </Button>
);
