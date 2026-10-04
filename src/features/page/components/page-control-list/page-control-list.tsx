import type { ComponentPropsWithRef, FC } from 'react';

import type { Page } from '../../models/page';
import type { PageId } from '../../models/page-id';
import { PageControlListItem } from '../page-control-list-item/page-control-list-item';

export type PageControlListProps = Omit<
  ComponentPropsWithRef<'ul'>,
  'children'
> & {
  currentPageId?: PageId;
  deletable?: boolean;
  pages: readonly Page[];
};

export const PageControlList: FC<PageControlListProps> = ({
  currentPageId,
  deletable = false,
  pages,
  ...rest
}) => (
  <ul {...rest} data-scope>
    {pages.map((page) => (
      <PageControlListItem
        key={page.pageId}
        current={page.pageId === currentPageId}
        deletable={deletable}
        href={`/pages/${page.pageId}`}
        id={page.pageId}
        title={page.title}
      />
    ))}
  </ul>
);
