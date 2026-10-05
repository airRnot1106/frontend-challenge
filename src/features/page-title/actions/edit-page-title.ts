'use server';

import { Result } from '@praha/byethrow';
import { updateTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PAGE_CACHE_TAG } from '../../page/cache-tags';
import { PageId } from '../../page/models/page-id';
import { PageTitle } from '../models/page-title';

export const editPageTitle = async (
  pageId: number,
  title: string,
): Promise<void> => {
  const id = Result.unwrap(PageId.parse(pageId));
  const value = Result.unwrap(PageTitle.parse(title));
  await Api.content.updateContent({
    body: { title: value },
    path: { id },
    throwOnError: true,
  });
  updateTag(PAGE_CACHE_TAG);
};
