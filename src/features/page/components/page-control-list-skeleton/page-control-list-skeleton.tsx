import type { FC } from 'react';

import styles from './page-control-list-skeleton.module.css';

const ITEM_COUNT = 5;
const ITEM_KEYS = Array.from(
  { length: ITEM_COUNT },
  (_, index) => `item-${index}`,
);

export const PageControlListSkeleton: FC = () => (
  <output
    aria-busy="true"
    aria-label="ページを読み込み中"
    className={styles.root}
    data-scope
  >
    {ITEM_KEYS.map((key) => (
      <span key={key} aria-hidden="true" className={styles.item}>
        <span className={styles.bar} />
      </span>
    ))}
  </output>
);
