'use client';

import { Button as BaseUIButton } from '@base-ui/react/button';
import type { ButtonProps as BaseUIButtonProps } from '@base-ui/react/button';
import { LoaderCircle } from 'lucide-react';
import type { FC } from 'react';
import { useTransition } from 'react';

import styles from './button.module.css';

type OnClick = NonNullable<BaseUIButtonProps['onClick']>;

export type ButtonProps = Omit<BaseUIButtonProps, 'className' | 'style'> & {
  style?: {
    '--button--bg'?: string;
    '--button--bg-hover'?: string;
    '--button--bg-pressed'?: string;
    '--button--color'?: string;
    '--button--border-color'?: string;
    '--button--radius'?: string;
    '--button--font-size'?: string;
    '--button--font-weight'?: string;
    '--button--inline-size'?: string;
    '--button--block-size'?: string;
    '--button--padding-inline'?: string;
  };
  action?: (...args: Parameters<OnClick>) => void | Promise<void>;
  pending?: boolean;
};

export const Button: FC<ButtonProps> = ({
  disabled = false,
  pending = false,
  onClick,
  action,
  children,
  ...rest
}) => {
  const [isActionPending, startTransition] = useTransition();
  const isPending = pending || isActionPending;

  const handleClick: OnClick = (...args) => {
    onClick?.(...args);
    if (action) {
      startTransition(async () => {
        await action(...args);
      });
    }
  };

  return (
    <BaseUIButton
      aria-busy={isPending || undefined}
      className={styles.root}
      data-scope
      disabled={disabled || isPending}
      // 処理中に押されたボタンからフォーカスが外れないようにする
      focusableWhenDisabled={isPending}
      onClick={handleClick}
      {...rest}
    >
      <span className={styles.content}>{children}</span>
      {isPending && (
        <span className={styles.spinner}>
          <LoaderCircle aria-hidden />
        </span>
      )}
    </BaseUIButton>
  );
};
