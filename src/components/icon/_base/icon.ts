import type { ComponentProps } from 'react';

export type IconProps = Omit<
  ComponentProps<'svg'>,
  'children' | 'height' | 'viewBox' | 'width'
> & {
  size?: number;
};
