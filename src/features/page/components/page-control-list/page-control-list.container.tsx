import type { ReactElement } from 'react';

import { getPages } from '../../fetchers/get-pages';
import type { PageId } from '../../models/page-id';
import { PageControlList } from './page-control-list';
import type { PageControlListProps } from './page-control-list';

export interface PageControlListContainerProps {
  currentPageId?: PageId;
  deletable?: boolean;
}

export const PageControlListContainer = async (
  props: PageControlListContainerProps,
): Promise<ReactElement<PageControlListProps>> => {
  const pages = await getPages();
  return <PageControlList {...props} pages={pages} />;
};
