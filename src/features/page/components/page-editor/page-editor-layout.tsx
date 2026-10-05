import type { ComponentPropsWithRef, FC } from 'react';

import styles from './page-editor-layout.module.css';

export type PageEditorLayoutProps = ComponentPropsWithRef<'article'>;

// タイトルの行と本文の行は、この grid の名前付きの線に subgrid で揃える
export const PageEditorLayout: FC<PageEditorLayoutProps> = (props) => (
  <article {...props} className={styles.root} data-scope />
);
