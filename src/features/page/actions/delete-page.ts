'use server';

import { updateTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PAGE_CACHE_TAG } from '../cache-tags';

export const deletePage = async (id: number): Promise<void> => {
  await Api.content.deleteContent({ path: { id } });
  updateTag(PAGE_CACHE_TAG);
};
