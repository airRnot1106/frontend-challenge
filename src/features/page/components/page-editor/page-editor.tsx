import type { ComponentPropsWithRef, FC } from 'react';

import { PageBodyEditor } from '../../../page-body/components/page-body-editor/page-body-editor';
import { PageTitleEditor } from '../../../page-title/components/page-title-editor/page-title-editor';
import type { Page } from '../../models/page';
import styles from './page-editor.module.css';

export type PageEditorProps = Omit<
  ComponentPropsWithRef<'article'>,
  'children'
> & {
  page: Page;
};

export const PageEditor: FC<PageEditorProps> = ({ page, ...rest }) => (
  <article {...rest} className={styles.root} data-scope>
    {/* 別のページに切り替えたとき、編集中の状態を引き継がない */}
    <PageTitleEditor key={`title-${page.pageId}`} page={page} />
    <PageBodyEditor key={`body-${page.pageId}`} page={page} />
  </article>
);
