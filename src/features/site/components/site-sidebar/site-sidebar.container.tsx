import type { ReactElement } from 'react';

import { getPages } from '../../../page/fetchers/get-pages';
import { SiteSidebar } from './site-sidebar';
import type { SiteSidebarProps } from './site-sidebar';

export type SiteSidebarContainerProps = Omit<SiteSidebarProps, 'pagesPromise'>;

// ページの一覧は待たずに渡し、サイドバーの一覧の部分だけが読み込みを待つ
export const SiteSidebarContainer = (
  props: SiteSidebarContainerProps,
): ReactElement<SiteSidebarProps> => (
  <SiteSidebar {...props} pagesPromise={getPages()} />
);
