import type { FC } from 'react';

import { EditButton } from '../../../../components/button/edit/edit-button';
import { PageEditorLayout } from './page-editor-layout';
import styles from './page-editor-skeleton.module.css';

const BODY_LINE_COUNT = 6;
const BODY_LINE_KEYS = Array.from(
  { length: BODY_LINE_COUNT },
  (_, index) => `line-${index}`,
);

// ページを読み込むまで、タイトルと本文の代わりにスケルトンを表示し、編集を始められないようにする
export const PageEditorSkeleton: FC = () => (
  <PageEditorLayout aria-busy="true" aria-label="ページを読み込み中">
    <div className={styles.title}>
      <span aria-hidden="true" className={styles['title-bar']} />
      <div className={styles.actions}>
        <EditButton disabled>Edit</EditButton>
      </div>
    </div>
    <div className={styles.body}>
      <div aria-hidden="true" className={styles.box}>
        {BODY_LINE_KEYS.map((key) => (
          <span key={key} className={styles['body-bar']} />
        ))}
      </div>
      <div className={styles.actions}>
        <EditButton disabled>Edit</EditButton>
      </div>
    </div>
  </PageEditorLayout>
);
