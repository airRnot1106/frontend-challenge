import Link from 'next/link';
import type { FC } from 'react';

import type { PageId } from '../../models/page-id';
import { PageDeleteButton } from '../page-delete-button/page-delete-button';
import styles from './page-control-list-item.module.css';

export interface PageControlListItemProps {
  id: PageId;
  current?: boolean;
  deletable?: boolean;
  href: string;
  title: string;
}

export const PageControlListItem: FC<PageControlListItemProps> = ({
  id,
  current = false,
  deletable = false,
  href,
  title,
}) => (
  <li className={styles.root} data-scope>
    <Link
      aria-current={current ? 'page' : undefined}
      className={styles.link}
      href={href}
    >
      {title}
    </Link>
    {deletable && (
      <PageDeleteButton
        aria-label={`${title}を削除する`}
        current={current}
        pageId={id}
      />
    )}
  </li>
);
