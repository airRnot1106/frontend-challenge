import { cacheTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PAGE_CACHE_TAG } from '../cache-tags';

import 'server-only';

export const getPages = async () => {
  'use cache';
  cacheTag(PAGE_CACHE_TAG);
  const { data } = await Api.content.getAllContentList();
  return data;
};
