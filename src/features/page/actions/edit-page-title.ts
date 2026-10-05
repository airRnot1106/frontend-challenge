'use server';

import { Result } from '@praha/byethrow';
import { updateTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PageTitle } from '../../page-title/models/page-title';
import { PAGE_CACHE_TAG } from '../cache-tags';
import { PageId } from '../models/page-id';

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
