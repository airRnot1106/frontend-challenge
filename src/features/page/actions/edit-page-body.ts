'use server';

import { Result } from '@praha/byethrow';
import { updateTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PageBody } from '../../page-body/models/page-body';
import { PAGE_CACHE_TAG } from '../cache-tags';
import { PageId } from '../models/page-id';

export const editPageBody = async (
  pageId: number,
  body: string,
): Promise<void> => {
  const id = Result.unwrap(PageId.parse(pageId));
  const value = Result.unwrap(PageBody.parse(body));
  await Api.content.updateContent({
    body: { body: value },
    path: { id },
    throwOnError: true,
  });
  updateTag(PAGE_CACHE_TAG);
};
