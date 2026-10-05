import type { ComponentPropsWithRef, FC, ReactNode } from 'react';

import styles from './empty-page-editor.module.css';

export type EmptyPageEditorProps = Omit<
  ComponentPropsWithRef<'div'>,
  'children'
> & {
  // 編集するページがない理由を伝える文言
  children: ReactNode;
};

export const EmptyPageEditor: FC<EmptyPageEditorProps> = ({
  children,
  ...rest
}) => (
  <div {...rest} className={styles.root} data-scope>
    <p className={styles.message}>{children}</p>
  </div>
);
