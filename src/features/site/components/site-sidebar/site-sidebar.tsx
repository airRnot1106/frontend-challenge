'use client';

import type { ComponentPropsWithRef, FC } from 'react';
import { Suspense, use, useState } from 'react';

import { CheckButton } from '../../../../components/button/check/check-button';
import { EditButton } from '../../../../components/button/edit/edit-button';
import { PageAddButton } from '../../../page/components/page-add-button/page-add-button';
import { PageControlListSkeleton } from '../../../page/components/page-control-list-skeleton/page-control-list-skeleton';
import { PageControlList } from '../../../page/components/page-control-list/page-control-list';
import { useCurrentPageId } from '../../../page/hooks/use-current-page-id';
import type { Page } from '../../../page/models/page';
import { SiteIcon } from '../site-icon/site-icon';
import styles from './site-sidebar.module.css';

export type SiteSidebarProps = Omit<
  ComponentPropsWithRef<'aside'>,
  'children'
> & {
  pagesPromise: Promise<readonly Page[]>;
};

interface SiteSidebarMenuProps {
  pagesPromise: Promise<readonly Page[]>;
}

const SiteSidebarMenu: FC<SiteSidebarMenuProps> = ({ pagesPromise }) => {
  const pages = use(pagesPromise);
  const currentPageId = useCurrentPageId();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <nav aria-label="ページ" className={styles.navigation}>
        <PageControlList
          currentPageId={currentPageId}
          deletable={editing}
          pages={pages}
        />
      </nav>
      <footer className={styles.footer}>
        {editing ? (
          <>
            <PageAddButton>New Page</PageAddButton>
            <CheckButton
              onClick={() => {
                setEditing(false);
              }}
            >
              Done
            </CheckButton>
          </>
        ) : (
          <EditButton
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </EditButton>
        )}
      </footer>
    </>
  );
};

// ページの一覧を読み込むまで、一覧の代わりにスケルトンを表示し、編集を始められないようにする
const SiteSidebarMenuFallback: FC = () => (
  <>
    <nav aria-label="ページ" className={styles.navigation}>
      <PageControlListSkeleton />
    </nav>
    <footer className={styles.footer}>
      <EditButton disabled>Edit</EditButton>
    </footer>
  </>
);

export const SiteSidebar: FC<SiteSidebarProps> = ({
  pagesPromise,
  ...rest
}) => (
  <aside {...rest} className={styles.root} data-scope>
    <div className={styles.layout}>
      <span className={styles.brand}>
        <SiteIcon aria-hidden />
        ServiceName
      </span>
      <Suspense fallback={<SiteSidebarMenuFallback />}>
        <SiteSidebarMenu pagesPromise={pagesPromise} />
      </Suspense>
    </div>
  </aside>
);
