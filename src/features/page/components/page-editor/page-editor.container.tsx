import { Result } from '@praha/byethrow';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { getPage } from '../../fetchers/get-page';
import { PageId } from '../../models/page-id';
import { PageEditor } from './page-editor';
import type { PageEditorProps } from './page-editor';

export interface PageEditorContainerProps {
  // URL の /pages/[pageId] から取り出した値
  pageId: string;
}

export const PageEditorContainer = async ({
  pageId,
}: PageEditorContainerProps): Promise<ReactElement<PageEditorProps>> => {
  const id = PageId.parse(Number(pageId));
  if (Result.isFailure(id)) {
    notFound();
  }
  const page = await getPage(id.value);
  if (page === undefined) {
    notFound();
  }
  return <PageEditor page={page} />;
};
